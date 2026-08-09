"use client";

import { useEffect, useState } from "react";
import { useLang } from "@/lib/use-lang";
import { useProductSelection } from "@/lib/use-product-selection";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { toast } from "sonner";
import { orderSchema } from "@/lib/validation";
import {
  CircleCheck,
  Loader2,
  Send,
  ShoppingCart,
  Wrench,
  Mail,
  Phone,
  MapPin,
} from "lucide-react";

type FormType = "order" | "custom";

interface FormState {
  name: string;
  email: string;
  phone: string;
  company: string;
  country: string;
  product: string;
  quantity: string;
  budget: string;
  timeline: string;
  message: string;
}

const PRODUCT_OPTIONS_KEYS = [
  { value: "vehicle-collision", labelKey: "productOption1" },
  { value: "structural-monitoring", labelKey: "productOption2" },
  { value: "vision-arm", labelKey: "productOption3" },
  { value: "warehouse-robot", labelKey: "productOption4" },
  { value: "other", labelKey: "productOptionOther" },
] as const;

const PRODUCT_ID_TO_VALUE: Record<string, string> = {
  "vehicle-collision": "vehicle-collision",
  "structural-monitoring": "structural-monitoring",
  "vision-arm": "vision-arm",
  "warehouse-robot": "warehouse-robot",
};

export function OrderForm() {
  const { t, lang } = useLang();
  const productId = useProductSelection((s) => s.productId);
  const productName = useProductSelection((s) => s.productName);
  const clearProduct = useProductSelection((s) => s.setProduct);

  const [formType, setFormType] = useState<FormType>("order");
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);

  const [form, setForm] = useState<FormState>({
    name: "",
    email: "",
    phone: "",
    company: "",
    country: lang === "zh" ? "中国" : "China",
    product: "",
    quantity: "1",
    budget: "",
    timeline: "",
    message: "",
  });

  // When a product card is clicked elsewhere on the page,
  // it sets productId/productName and scrolls here. Sync the form.
  useEffect(() => {
    if (productId && PRODUCT_ID_TO_VALUE[productId]) {
      setFormType("order");
      setForm((f) => ({
        ...f,
        product: productId,
      }));
    }
  }, [productId, productName]);

  const update = <K extends keyof FormState>(key: K, value: FormState[K]) => {
    setForm((f) => ({ ...f, [key]: value }));
  };

  const validate = (): string | null => {
    // Use the SAME Zod schema as the server so client and server rules
    // can never drift apart. (Ref: code review finding #4)
    const parsed = orderSchema.safeParse({
      type: formType,
      name: form.name.trim(),
      email: form.email.trim(),
      phone: form.phone.trim(),
      company: form.company.trim() || null,
      country: form.country.trim() || null,
      productId: form.product || null,
      productName: null,
      quantity: parseInt(form.quantity || "1", 10) || 1,
      budget: form.budget.trim() || null,
      timeline: form.timeline.trim() || null,
      message: form.message.trim(),
    });
    if (parsed.success) return null;

    // Map the first Zod issue to a user-facing message.
    const issue = parsed.error.issues[0];
    const field = issue?.path[0];
    const fieldLabelMap: Record<string, string> = {
      name: t.formName,
      email: t.formEmail,
      phone: t.formPhone,
      message: t.formMessage,
    };
    if (field && fieldLabelMap[field]) {
      return `${fieldLabelMap[field]} ${t.formRequired}`;
    }
    return t.formError;
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const err = validate();
    if (err) {
      toast.error(err);
      return;
    }

    setSubmitting(true);
    try {
      const productNameResolved =
        form.product &&
        PRODUCT_OPTIONS_KEYS.find((o) => o.value === form.product)?.labelKey;
      const productNameStr = productNameResolved
        ? (t[productNameResolved as keyof typeof t] as string)
        : null;

      const res = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: formType,
          name: form.name.trim(),
          email: form.email.trim(),
          phone: form.phone.trim(),
          company: form.company.trim() || null,
          country: form.country.trim() || null,
          productId: form.product || null,
          productName: productNameStr,
          quantity: parseInt(form.quantity || "1", 10) || 1,
          budget: form.budget.trim() || null,
          timeline: form.timeline.trim() || null,
          message: form.message.trim(),
        }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        // Friendly handling for rate-limit responses (HTTP 429)
        if (res.status === 429) {
          const retryAfter = data?.retryAfter ?? 60;
          const msg =
            lang === "zh"
              ? `提交过于频繁，请 ${retryAfter} 秒后再试`
              : `Too many submissions. Please try again in ${retryAfter}s.`;
          throw new Error(msg);
        }
        if (data?.error === "forbidden") {
          throw new Error(
            lang === "zh"
              ? "来源不合法，无法提交"
              : "Request blocked: origin not allowed."
          );
        }
        throw new Error(data?.error || "request_failed");
      }

      setDone(true);
      toast.success(t.formSuccess);

      // Reset form
      setForm({
        name: "",
        email: "",
        phone: "",
        company: "",
        country: lang === "zh" ? "中国" : "China",
        product: "",
        quantity: "1",
        budget: "",
        timeline: "",
        message: "",
      });
      clearProduct(null, null);

      // Hide success state after a while so user can submit again
      setTimeout(() => setDone(false), 6000);
    } catch (err) {
      console.error(err);
      // If the thrown value is an Error with a localized message (rate-limit,
      // forbidden), show that message instead of the generic error string.
      const msg = err instanceof Error ? err.message : t.formError;
      toast.error(msg);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section
      id="order"
      className="relative py-20 sm:py-28 bg-secondary/30 scroll-mt-16"
    >
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-border to-transparent" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-12">
          {/* Left — copy + contact info */}
          <div className="lg:col-span-5">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-brand/30 bg-brand-soft text-xs font-semibold text-brand tracking-wide">
              <span className="h-1.5 w-1.5 rounded-full bg-brand" />
              {t.formEyebrow}
            </div>
            <h2 className="mt-5 text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-foreground">
              {t.formTitle}
            </h2>
            <p className="mt-4 text-base sm:text-lg text-muted-foreground leading-relaxed">
              {t.formSubtitle}
            </p>

            <div className="mt-8 space-y-3">
              <ContactRow
                icon={Mail}
                label={t.footerEmailLabel}
                value="contact@hmbot.net"
                href="mailto:contact@hmbot.net"
              />
              <ContactRow
                icon={MapPin}
                label={t.footerAddressLabel}
                value={t.footerAddress}
              />
              <ContactRow
                icon={Phone}
                label={t.footerDomainLabel}
                value={t.domain}
              />
            </div>

            <div className="mt-8 hidden lg:flex items-center gap-2 text-xs text-muted-foreground/80 leading-relaxed">
              <CircleCheck className="h-4 w-4 text-growth shrink-0" />
              <span>{t.formPrivacy}</span>
            </div>
          </div>

          {/* Right — form card */}
          <div className="lg:col-span-7">
            <div className="rounded-2xl border border-border bg-card p-5 sm:p-7 shadow-sm">
              <Tabs
                value={formType}
                onValueChange={(v) => setFormType(v as FormType)}
              >
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="order" className="gap-1.5">
                    <ShoppingCart className="h-3.5 w-3.5" />
                    {t.formTabOrder}
                  </TabsTrigger>
                  <TabsTrigger value="custom" className="gap-1.5">
                    <Wrench className="h-3.5 w-3.5" />
                    {t.formTabCustom}
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="order" className="mt-6">
                  <OrderFields
                    form={form}
                    update={update}
                    submitting={submitting}
                    done={done}
                    onSubmit={onSubmit}
                    showProductSelect
                    showQuantity
                    messagePlaceholder={t.formMessageOrderPlaceholder}
                    t={t}
                  />
                </TabsContent>

                <TabsContent value="custom" className="mt-6">
                  <OrderFields
                    form={form}
                    update={update}
                    submitting={submitting}
                    done={done}
                    onSubmit={onSubmit}
                    showProductSelect
                    showQuantity={false}
                    messagePlaceholder={t.formMessageCustomPlaceholder}
                    t={t}
                  />
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function ContactRow({
  icon: Icon,
  label,
  value,
  href,
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  value: string;
  href?: string;
}) {
  const content = (
    <div className="flex items-center gap-3 p-3 rounded-lg border border-border bg-background hover:border-brand/40 transition-colors">
      <div className="shrink-0 inline-flex h-9 w-9 items-center justify-center rounded-lg bg-brand-soft text-brand">
        <Icon className="h-4 w-4" />
      </div>
      <div className="min-w-0">
        <div className="text-[11px] uppercase tracking-wide text-muted-foreground">
          {label}
        </div>
        <div className="text-sm font-medium text-foreground truncate">
          {value}
        </div>
      </div>
    </div>
  );

  if (href) {
    return (
      <a href={href} className="block">
        {content}
      </a>
    );
  }
  return content;
}

interface OrderFieldsProps {
  form: FormState;
  update: <K extends keyof FormState>(key: K, value: FormState[K]) => void;
  submitting: boolean;
  done: boolean;
  onSubmit: (e: React.FormEvent) => void;
  showProductSelect: boolean;
  showQuantity: boolean;
  messagePlaceholder: string;
  t: ReturnType<typeof useLang>["t"];
}

function OrderFields({
  form,
  update,
  submitting,
  done,
  onSubmit,
  showProductSelect,
  showQuantity,
  messagePlaceholder,
  t,
}: OrderFieldsProps) {
  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <div className="grid sm:grid-cols-2 gap-4">
        <Field label={t.formName} required>
          <Input
            value={form.name}
            onChange={(e) => update("name", e.target.value)}
            placeholder={t.formNamePlaceholder}
            required
            disabled={submitting}
          />
        </Field>
        <Field label={t.formPhone} required>
          <Input
            value={form.phone}
            onChange={(e) => update("phone", e.target.value)}
            placeholder={t.formPhonePlaceholder}
            required
            disabled={submitting}
          />
        </Field>
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        <Field label={t.formEmail} required>
          <Input
            type="email"
            value={form.email}
            onChange={(e) => update("email", e.target.value)}
            placeholder={t.formEmailPlaceholder}
            required
            disabled={submitting}
          />
        </Field>
        <Field label={t.formCompany}>
          <Input
            value={form.company}
            onChange={(e) => update("company", e.target.value)}
            placeholder={t.formCompanyPlaceholder}
            disabled={submitting}
          />
        </Field>
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        <Field label={t.formCountry}>
          <Input
            value={form.country}
            onChange={(e) => update("country", e.target.value)}
            placeholder={t.formCountryPlaceholder}
            disabled={submitting}
          />
        </Field>
        {showProductSelect && (
          <Field label={t.formProduct}>
            <Select
              value={form.product}
              onValueChange={(v) => update("product", v)}
              disabled={submitting}
            >
              <SelectTrigger>
                <SelectValue placeholder={t.formProductPlaceholder} />
              </SelectTrigger>
              <SelectContent>
                {PRODUCT_OPTIONS_KEYS.map((opt) => (
                  <SelectItem key={opt.value} value={opt.value}>
                    {t[opt.labelKey as keyof typeof t] as string}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </Field>
        )}
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        {showQuantity && (
          <Field label={t.formQuantity}>
            <Input
              type="number"
              min={1}
              value={form.quantity}
              onChange={(e) => update("quantity", e.target.value)}
              disabled={submitting}
            />
          </Field>
        )}
        <Field label={t.formBudget}>
          <Input
            value={form.budget}
            onChange={(e) => update("budget", e.target.value)}
            placeholder={t.formBudgetPlaceholder}
            disabled={submitting}
          />
        </Field>
      </div>

      <Field label={t.formTimeline}>
        <Input
          value={form.timeline}
          onChange={(e) => update("timeline", e.target.value)}
          placeholder={t.formTimelinePlaceholder}
          disabled={submitting}
        />
      </Field>

      <Field label={t.formMessage} required>
        <Textarea
          value={form.message}
          onChange={(e) => update("message", e.target.value)}
          placeholder={messagePlaceholder}
          required
          rows={5}
          disabled={submitting}
          className="resize-y min-h-[120px]"
        />
      </Field>

      <div className="flex items-center gap-3 pt-2">
        <Button
          type="submit"
          disabled={submitting}
          className="bg-brand text-brand-foreground hover:bg-brand/90 shadow-sm min-w-[160px]"
        >
          {submitting ? (
            <>
              <Loader2 className="h-4 w-4 mr-2 animate-spin" />
              {t.formSubmitting}
            </>
          ) : done ? (
            <>
              <CircleCheck className="h-4 w-4 mr-2" />
              ✓
            </>
          ) : (
            <>
              <Send className="h-4 w-4 mr-2" />
              {t.formSubmit}
            </>
          )}
        </Button>
        {done && (
          <span className="text-sm font-medium text-growth flex items-center gap-1">
            <CircleCheck className="h-4 w-4" />
            {t.formSuccess}
          </span>
        )}
      </div>

      <p className="text-xs text-muted-foreground/80 leading-relaxed pt-2 sm:hidden">
        {t.formPrivacy}
      </p>
    </form>
  );
}

function Field({
  label,
  required,
  children,
}: {
  label: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-1.5">
      <Label className="text-sm font-medium text-foreground">
        {label}
        {required && <span className="text-brand ml-0.5">*</span>}
      </Label>
      {children}
    </div>
  );
}
