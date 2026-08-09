// Bilingual translations for HMbot / 后马时代 official website
// All user-facing strings live here. Access via `useLang()` hook.

export type Lang = "zh" | "en";

export type Dict = typeof dict.zh;

export const dict = {
  zh: {
    // Brand & Meta
    brandName: "后马时代",
    brandFull: "北京后马时代科技有限责任公司",
    brandTagline: "务实创造 · 智造未来",
    domain: "hmbot.net",

    // Navigation
    navAbout: "关于我们",
    navProducts: "产品矩阵",
    navAchievements: "成就荣誉",
    navInvestor: "加入我们",
    navContact: "联系我们",
    navQuote: "在线询价",

    // Hero
    heroEyebrow: "实用机器人 · 北京智造",
    heroTitle1: "把机器人技术",
    heroTitleHighlight: "落到真实场景",
    heroTitle2: "",
    heroSubtitle:
      "我们没有走高大上的人形路线。后马时代以视觉识别为核心，做出能在工地、桥梁、实验室、仓库里真正干活的产品 —— 极致性价比、可落地、可持续。我们相信，技术真正抵达生活的每一个角落，才算是它本来的样子。",
    heroQuote: "—— 不追风口，先扎下根；不赌未来，先把今天过好。",
    heroCtaPrimary: "查看产品矩阵",
    heroCtaSecondary: "预约演示",
    heroStat1: "千余",
    heroStat1Label: "已部署设备",
    heroStat2: "4",
    heroStat2Label: "产品线",
    heroStat3: "数十",
    heroStat3Label: "企业与机构客户",
    heroStat4: "多项",
    heroStat4Label: "创业大赛奖项",

    // Trust bar
    trustTitle: "服务过的客户与场景",
    trustSubtitle: "从顶尖高校实验室到国家级重点工程",
    trustPartner1: "清华大学",
    trustPartner2: "北京大学",
    trustPartner3: "国家级科研机构",
    trustPartner4: "国家大坝工程",
    trustPartner5: "大型桥梁项目",
    trustPartner6: "工程车辆运营",
    trustPartner7: "涉密单位",
    trustPartner8: "北京机器人创业大赛",

    // About / Philosophy
    aboutEyebrow: "我们的来路",
    aboutTitle: "先把根扎进土里",
    aboutLead:
      "风口会过去，热度会退潮。我们选择在最热闹的时候保持安静，在最不被看好的角落里把根扎深——做自己能做、市场能用、团队能养活的小产品，让每一行代码都见过真实的灰尘、雨水和震动。",
    aboutPoint1Title: "从工地起步",
    aboutPoint1Text:
      "数百台工程车辆的盲区被解决，数百套大坝和桥梁的监测设备 7×24 小时持续运行。我们没有先讲故事，而是先让产品自己讲——讲它在哪里被装上、为谁挡过一次事故、替谁省下一笔不该花的钱。",
    aboutPoint2Title: "让技术回归平常",
    aboutPoint2Text:
      "同样的视觉防撞能力，过去要十几万一套，只有大型项目用得起。我们把它做到了几分之一的价格，让更多工程队、更多县级公路、更多山乡桥梁，都能装上、用得起、用得久。技术不该是少数人的奢侈品。",
    aboutPoint3Title: "一门手艺，多般应用",
    aboutPoint3Text:
      "从车辆防撞到山体监测，从机械臂到仓储机器人，背后是同一套被反复打磨的视觉感知与运动控制。手艺人讲究一把刀用一辈子——我们的技术栈，也正是在这一个个真实场景里被磨亮的。",
    aboutPoint4Title: "先把日子过踏实",
    aboutPoint4Text:
      "我们靠订单和交付养活团队，不靠融资续命。能自己挣饭吃的团队，才知道什么叫对产品负责、对客户负责、对每一分投入负责。这是我们的底色，也是我们想找的同行者的底色。",

    // Products
    productsEyebrow: "产品矩阵",
    productsTitle: "四条已经跑通的产品线",
    productsSubtitle: "不是 PPT 上的设想，是一台一台装上去、一行一行调出来的",
    product1Name: "工程车辆防撞预警系统",
    product1Tag: "工程机械 · 视觉防撞",
    product1Short: "以极低价格彻底解决工程车辆视觉盲区",
    product1Desc:
      "基于自研视觉识别算法，实时识别车辆周围的工人、设备、障碍物，在毫秒级时间内发出声光预警。已在全国多地工地规模部署，以传统方案几分之一的价格，实现同等级甚至更高的安全防护能力。",
    product1Spec1: "多地规模部署",
    product1Spec2: "毫秒级响应",
    product1Spec3: "全天候视觉识别",
    product2Name: "建筑·山体·桥梁安全监测",
    product2Tag: "基础设施 · 结构健康监测",
    product2Short: "守护大坝与桥梁，减少人财损失",
    product2Desc:
      "针对大型水坝、桥梁、山体边坡的长期结构健康监测方案。融合视觉位移测量、裂缝识别、振动监测多模态数据，提供 7×24 小时风险预警。已在多个国家级工程中规模部署，将事故消灭在发生之前。",
    product2Spec1: "数百套在役",
    product2Spec1Label: "重点工程",
    product2Spec2: "7×24",
    product2Spec2Label: "持续监测",
    product2Spec3: "多模态融合",
    product3Name: "视觉机械臂",
    product3Tag: "实验室 · 精密操作",
    product3Short: "清华北大实验室在用的科研级机械臂",
    product3Desc:
      "为高校与科研院所打造的高精度视觉机械臂，具备亚毫米级定位与灵活的二次开发接口。已服务于清华大学、北京大学多个实验室，支持视觉抓取、自动实验、人机协作等多种科研场景。",
    product3Spec1: "清华·北大",
    product3Spec1Label: "实验室在用",
    product3Spec2: "亚毫米级",
    product3Spec2Label: "定位精度",
    product3Spec3: "开放 SDK",
    product4Name: "仓储运输机器人",
    product4Tag: "智慧物流 · 自主导航",
    product4Short: "国家级科研项目，可定制开发",
    product4Desc:
      "面向仓储、洁净室、保密单位的自主运输机器人，支持 SLAM 导航、多机协同、定制化场景适配。已落地国家级科研重点项目，并多次为涉密单位提供定制开发服务。",
    product4Spec1: "国家级科研机构",
    product4Spec1Label: "重点项目",
    product4Spec2: "SLAM 导航",
    product4Spec2Label: "多机协同",
    product4Spec3: "定制开发",

    // Product actions
    productInquire: "在线询价",
    productOrder: "立即下单",
    productCustom: "定制咨询",

    // Achievements
    achievementsEyebrow: "三年路上",
    achievementsTitle: "不声不响，撞出了一些痕迹",
    achievementsSubtitle: "没什么惊天动地，都是一个个项目、一台台设备，慢慢攒下来的",
    achievement1Value: "千余",
    achievement1Label: "设备部署总量",
    achievement1Desc: "覆盖工程车辆、安全监测、机械臂、仓储机器人四大场景",
    achievement2Value: "数百",
    achievement2Label: "安全监测设备",
    achievement2Desc: "在大坝、桥梁、山体边坡 7×24 持续运行",
    achievement3Value: "数十",
    achievement3Label: "企业与机构客户",
    achievement3Desc: "包含清华、北大等顶尖高校与国家级科研单位",
    achievement4Value: "多项",
    achievement4Label: "创业大赛奖项",
    achievement4Desc: "多次在北京机器人创业比赛中获奖",

    awardsTitle: "近年获奖与里程碑",
    award1: "北京机器人创业比赛获奖",
    award1Desc: "多次在北京机器人创业比赛中获奖，技术与商业双认可",
    award2: "国家级科研重点项目合作",
    award2Desc: "仓储运输机器人入选国家级科研机构重点项目，并多次为涉密单位定制开发",
    award3: "清华北大实验室合作",
    award3Desc: "视觉机械臂已大量服务于清华大学、北京大学多个实验室",
    award4: "工程车辆防撞规模部署",
    award4Desc: "全国多地规模部署，以极致性价比颠覆传统方案",

    // Join us
    investorEyebrow: "同行的人",
    investorTitle: "我们在找一些愿意一起走远路的人",
    investorLead:
      "技术很重要，资金很重要，但比这些更重要的，是和你一起坐在桌前的人。后马时代不是要做一家融到下一轮的公司，而是想用一辈子的时间，把机器人这件事慢慢做成——做成一群人共同的志业。如果你也这样想，欢迎聊聊。",
    investorPoint1Title: "关于资金",
    investorPoint1Text:
      "我们不急着要钱。能自己养活自己的团队，才有资格慢慢选伙伴。如果您认同务实胜过讲故事、长期胜过短期、做事胜过做局，我们愿意认真聊一聊——成为股东也好，成为同行者也好，先把一杯茶喝完再说。",
    investorPoint2Title: "关于人",
    investorPoint2Text:
      "我们缺的不是简历漂亮的人，而是真的愿意把这件事当成自己事的人。视觉算法、嵌入式、机械结构、海外市场、客户成功——任何一条线上，如果你愿意把自己押进来一起干，这里都给你留了一张桌子。",
    investorPoint3Title: "关于远方",
    investorPoint3Text:
      "国内只是起点。我们正在把这套务实的技术带到一带一路、带到那些被高价方案挡在门外的市场。这不是一个人的远征，而是一群人的长跑——风物长宜放眼量，我们想找愿意一起走十年的伙伴。",
    investorPoint4Title: "关于意义",
    investorPoint4Text:
      "我们做这件事，不只是为了赢。大坝上的预警器替下游村子里的人多争取几秒钟；工地的防撞系统让一位开挖掘机的师傅平平安安回家——这些事不会上新闻，但它们让我们觉得，自己没白来。如果你也信这个，请来。",
    investorCta: "和创始团队聊聊",

    // Order form
    formEyebrow: "在线下单 / 定制咨询",
    formTitle: "告诉我们您的需求",
    formSubtitle: "无论是标准产品批量采购，还是定制化场景开发，我们都会在 24 小时内回复",
    formTabOrder: "标准产品下单",
    formTabCustom: "定制需求咨询",
    formName: "姓名 / 联系人",
    formNamePlaceholder: "请输入您的姓名",
    formEmail: "电子邮箱",
    formEmailPlaceholder: "name@company.com",
    formPhone: "联系电话",
    formPhonePlaceholder: "+86 138 0000 0000",
    formCompany: "公司 / 机构",
    formCompanyPlaceholder: "选填",
    formCountry: "国家 / 地区",
    formCountryPlaceholder: "中国",
    formProduct: "意向产品",
    formProductPlaceholder: "请选择产品",
    formQuantity: "数量",
    formBudget: "预算范围",
    formBudgetPlaceholder: "选填",
    formTimeline: "期望交付时间",
    formTimelinePlaceholder: "选填",
    formMessage: "需求描述",
    formMessageOrderPlaceholder: "请简要描述您的采购需求、应用场景、交付要求等",
    formMessageCustomPlaceholder: "请描述您的定制场景：环境、负载、精度、集成要求、合规要求等",
    formSubmit: "提交需求",
    formSubmitting: "提交中...",
    formSuccess: "提交成功，我们将在 24 小时内与您联系！",
    formError: "提交失败，请稍后重试或直接邮件联系",
    formRequired: "为必填项",
    formPrivacy: "提交即代表您同意我们处理上述信息用于联系沟通。我们不会将信息用于其他用途。",

    // Product options
    productOption1: "工程车辆防撞预警系统",
    productOption2: "建筑·山体·桥梁安全监测",
    productOption3: "视觉机械臂",
    productOption4: "仓储运输机器人",
    productOptionOther: "其他 / 不确定",

    // Footer
    footerTagline: "务实创造，让机器人技术真正服务于人",
    footerContactTitle: "联系我们",
    footerAddressLabel: "公司地址",
    footerAddress: "北京市",
    footerPhoneLabel: "联系电话",
    footerEmailLabel: "电子邮箱",
    footerEmail: "contact@hmbot.net",
    footerDomainLabel: "官网",
    footerNavTitle: "快速导航",
    footerProductTitle: "产品",
    footerInvestorTitle: "加入我们",
    footerCopyright: "© 2026 北京后马时代科技有限责任公司. 保留所有权利.",
    footerIcp: "京ICP备XXXXXXXX号",

    // Misc
    scrollDown: "向下滚动探索",
    backToTop: "回到顶部",
    langSwitch: "EN",
    menuOpen: "打开菜单",
    menuClose: "关闭菜单",
  },
  en: {
    // Brand & Meta
    brandName: "HMbot",
    brandFull: "Beijing Houma Era Technology Co., Ltd.",
    brandTagline: "Practical Robotics for a Living Future",
    domain: "hmbot.net",

    // Navigation
    navAbout: "About",
    navProducts: "Products",
    navAchievements: "Achievements",
    navInvestor: "Join Us",
    navContact: "Contact",
    navQuote: "Get a Quote",

    // Hero
    heroEyebrow: "Practical Robotics · Made in Beijing",
    heroTitle1: "Putting robotics to",
    heroTitleHighlight: "real-world work",
    heroTitle2: "",
    heroSubtitle:
      "We did not chase the humanoid hype. HMbot builds around computer vision and makes products that actually work on construction sites, bridges, labs, and warehouses — affordable, deployable, self-sustaining. We believe technology only becomes what it was meant to be when it finally reaches every corner of everyday life.",
    heroQuote: "— No chasing the wind. First, put down roots. No betting on tomorrow. First, live today well.",
    heroCtaPrimary: "Explore Products",
    heroCtaSecondary: "Book a Demo",
    heroStat1: "1k+",
    heroStat1Label: "Deployed units",
    heroStat2: "4",
    heroStat2Label: "Product lines",
    heroStat3: "Dozens",
    heroStat3Label: "Enterprise clients",
    heroStat4: "Multi.",
    heroStat4Label: "Startup awards",

    // Trust bar
    trustTitle: "Trusted by",
    trustSubtitle: "From top university labs to national-grade engineering projects",
    trustPartner1: "Tsinghua University",
    trustPartner2: "Peking University",
    trustPartner3: "National-grade research labs",
    trustPartner4: "National Dam Projects",
    trustPartner5: "Major Bridge Projects",
    trustPartner6: "Vehicle Operators",
    trustPartner7: "Classified Units",
    trustPartner8: "Beijing Robotics Awards",

    // About / Philosophy
    aboutEyebrow: "Where we came from",
    aboutTitle: "First, root deep in the soil",
    aboutLead:
      "Trends pass, hype recedes. While the loudest chased the spotlight, we chose the quieter corners — building products we could actually make, the market could actually use, and the team could actually live on. Every line of our code has met real dust, real rain, real vibration.",
    aboutPoint1Title: "Starting from the site",
    aboutPoint1Text:
      "Hundreds of construction vehicles no longer have blind spots. Hundreds of dams and bridges are watched around the clock. We did not tell the story first — we let the products tell it: where they were mounted, whose accident they once prevented, whose money they once saved.",
    aboutPoint2Title: "Let technology be ordinary again",
    aboutPoint2Text:
      "The same vision collision capability used to cost hundreds of thousands per unit — only mega-projects could afford it. We brought it down to a fraction of that price, so that more crews, more county roads, more bridges in mountain towns can be equipped and kept safe. Technology should not be a luxury for the few.",
    aboutPoint3Title: "One craft, many uses",
    aboutPoint3Text:
      "From vehicle collision to slope monitoring, from robotic arms to warehouse robots — the same stack of vision perception and motion control runs underneath, sharpened again and again. A craftsman keeps one blade for a lifetime; our tech stack has been tempered the same way, scene by scene.",
    aboutPoint4Title: "Keep the lights on ourselves",
    aboutPoint4Text:
      "We feed the team with orders and deliveries, not with investor runway. A team that earns its own meals knows what it means to be responsible — to the product, to the customer, to every yuan entrusted to it. That is our character, and the character of the people we hope to walk with.",

    // Products
    productsEyebrow: "Product Matrix",
    productsTitle: "Four product lines, already proven",
    productsSubtitle: "Not slides — actually mounted, actually debugged, actually earning their keep",
    product1Name: "Engineering Vehicle Collision Warning",
    product1Tag: "Heavy Machinery · Vision Safety",
    product1Short: "Solving blind spots at a fraction of the cost",
    product1Desc:
      "Built on proprietary vision algorithms, the system detects workers, equipment, and obstacles around vehicles in real time and triggers audio-visual alerts within milliseconds. Deployed across construction sites throughout China, matching or exceeding the safety performance of traditional solutions at a fraction of their price.",
    product1Spec1: "Multi-site deployment",
    product1Spec2: "Millisecond response",
    product1Spec3: "All-weather vision",
    product2Name: "Structure & Slope Safety Monitoring",
    product2Tag: "Infrastructure · Structural Health",
    product2Short: "Guarding dams and bridges, preventing loss",
    product2Desc:
      "Long-term structural health monitoring for large dams, bridges, and mountain slopes. Fuses vision-based displacement measurement, crack detection, and vibration monitoring into a 24/7 risk预警 system. Deployed at scale across multiple national-grade projects — stopping accidents before they happen.",
    product2Spec1: "Hundreds in service",
    product2Spec1Label: "Critical projects",
    product2Spec2: "24/7",
    product2Spec2Label: "Continuous monitoring",
    product2Spec3: "Multi-modal fusion",
    product3Name: "Vision Robotic Arm",
    product3Tag: "Laboratory · Precision Manipulation",
    product3Short: "Research-grade arm trusted by Tsinghua & PKU",
    product3Desc:
      "A high-precision vision robotic arm built for universities and research institutes, with sub-millimeter positioning and flexible secondary development interfaces. Deployed across multiple labs at Tsinghua University and Peking University, supporting vision grasping, automated experiments, and human-robot collaboration.",
    product3Spec1: "Tsinghua · PKU",
    product3Spec1Label: "Labs in use",
    product3Spec2: "Sub-millimeter",
    product3Spec2Label: "Positioning accuracy",
    product3Spec3: "Open SDK",
    product4Name: "Warehouse Transport Robot",
    product4Tag: "Smart Logistics · Autonomous Navigation",
    product4Short: "National lab key project, customizable",
    product4Desc:
      "Autonomous transport robots for warehouses, cleanrooms, and classified facilities. Supports SLAM navigation, multi-robot coordination, and scenario customization. Deployed in a national-grade research key project, with multiple custom builds for classified units.",
    product4Spec1: "National lab",
    product4Spec1Label: "Key project",
    product4Spec2: "SLAM navigation",
    product4Spec2Label: "Multi-robot fleet",
    product4Spec3: "Custom builds",

    // Product actions
    productInquire: "Get a Quote",
    productOrder: "Order Now",
    productCustom: "Custom Build",

    // Achievements
    achievementsEyebrow: "Three years on the road",
    achievementsTitle: "Quietly, we left some marks",
    achievementsSubtitle: "Nothing earth-shattering — just project by project, device by device, accumulated slowly",
    achievement1Value: "1k+",
    achievement1Label: "Total units deployed",
    achievement1Desc: "Covering construction vehicles, safety monitoring, robotic arms, and warehouse robots",
    achievement2Value: "Hundreds",
    achievement2Label: "Safety monitoring units",
    achievement2Desc: "Running 24/7 on dams, bridges, and slopes",
    achievement3Value: "Dozens",
    achievement3Label: "Enterprise & institutional clients",
    achievement3Desc: "Including top universities like Tsinghua and PKU, and national-grade research labs",
    achievement4Value: "Multi.",
    achievement4Label: "Startup awards",
    achievement4Desc: "Multiple wins in Beijing robotics startup competitions",

    awardsTitle: "Awards & Milestones",
    award1: "Beijing Robotics Startup Awards",
    award1Desc: "Multiple wins in Beijing robotics startup competitions — recognized for both technology and business",
    award2: "National Lab Key Project Partnership",
    award2Desc: "Warehouse transport robot selected for a national-grade research key project, with multiple custom builds for classified units",
    award3: "Tsinghua & PKU Lab Collaboration",
    award3Desc: "Vision robotic arms deployed across multiple Tsinghua and Peking University laboratories",
    award4: "Vehicle Collision System at Scale",
    award4Desc: "Multi-site deployment nationwide, disrupting the market with extreme cost-performance",

    // Join us
    investorEyebrow: "People who walk with us",
    investorTitle: "We are looking for people willing to walk a long road together",
    investorLead:
      "Technology matters. Capital matters. But more than either, what matters is who sits at the table with you. HMbot is not trying to be the company that makes it to the next round — we want to spend a lifetime slowly getting robotics right, and turn it into a shared calling for a group of people. If that resonates, we'd love to talk.",
    investorPoint1Title: "On capital",
    investorPoint1Text:
      "We are not in a hurry for money. A team that feeds itself earns the right to choose its partners slowly. If you believe substance beats storytelling, the long term beats the short, and doing beats scheming — let's talk. As a shareholder, as a fellow traveler — let's first share a cup of tea.",
    investorPoint2Title: "On people",
    investorPoint2Text:
      "What we lack is not impressive résumés, but people willing to treat this as their own. Vision algorithms, embedded systems, mechanical design, overseas markets, customer success — on any of these lines, if you're willing to put skin in the game, we have kept a seat for you at our table.",
    investorPoint3Title: "On the distance ahead",
    investorPoint3Text:
      "China is only the starting point. We are bringing this pragmatic technology to the Belt and Road, to markets shut out by overpriced solutions. This is no single person's expedition — it is a group's long run. We look for partners willing to walk ten years with us.",
    investorPoint4Title: "On meaning",
    investorPoint4Text:
      "We are not in this only to win. An early-warning sensor on a dam buys a downstream village a few more seconds. A collision system on a site lets an excavator operator go home safe. These things won't make the news, but they are why we feel this life has not been wasted. If you believe this too, please come.",
    investorCta: "Have a chat with the founders",

    // Order form
    formEyebrow: "Order / Custom Inquiry",
    formTitle: "Tell us what you need",
    formSubtitle: "Whether it is standard-product procurement or custom scenario development, we reply within 24 hours",
    formTabOrder: "Standard Product Order",
    formTabCustom: "Custom Build Inquiry",
    formName: "Name / Contact",
    formNamePlaceholder: "Your name",
    formEmail: "Email",
    formEmailPlaceholder: "name@company.com",
    formPhone: "Phone",
    formPhonePlaceholder: "+86 138 0000 0000",
    formCompany: "Company / Institution",
    formCompanyPlaceholder: "Optional",
    formCountry: "Country / Region",
    formCountryPlaceholder: "China",
    formProduct: "Product of interest",
    formProductPlaceholder: "Select a product",
    formQuantity: "Quantity",
    formBudget: "Budget range",
    formBudgetPlaceholder: "Optional",
    formTimeline: "Expected delivery",
    formTimelinePlaceholder: "Optional",
    formMessage: "Requirement description",
    formMessageOrderPlaceholder: "Briefly describe your procurement needs, application scenario, and delivery requirements",
    formMessageCustomPlaceholder: "Describe your custom scenario: environment, payload, precision, integration, compliance, etc.",
    formSubmit: "Submit Request",
    formSubmitting: "Submitting...",
    formSuccess: "Submitted! We will get back to you within 24 hours.",
    formError: "Submission failed. Please try again or email us directly.",
    formRequired: "is required",
    formPrivacy: "By submitting, you agree that we may process the above information to contact you. We will not use it for any other purpose.",

    // Product options
    productOption1: "Engineering Vehicle Collision Warning",
    productOption2: "Structure & Slope Safety Monitoring",
    productOption3: "Vision Robotic Arm",
    productOption4: "Warehouse Transport Robot",
    productOptionOther: "Other / Not sure",

    // Footer
    footerTagline: "Practical robotics, genuinely serving people",
    footerContactTitle: "Contact",
    footerAddressLabel: "Address",
    footerAddress: "Beijing, China",
    footerPhoneLabel: "Phone",
    footerEmailLabel: "Email",
    footerEmail: "contact@hmbot.net",
    footerDomainLabel: "Website",
    footerNavTitle: "Navigation",
    footerProductTitle: "Products",
    footerInvestorTitle: "Join Us",
    footerCopyright: "© 2026 Beijing Houma Era Technology Co., Ltd. All rights reserved.",
    footerIcp: "Beijing ICP No. XXXXXXXX",

    // Misc
    scrollDown: "Scroll to explore",
    backToTop: "Back to top",
    langSwitch: "中",
    menuOpen: "Open menu",
    menuClose: "Close menu",
  },
} as const;
