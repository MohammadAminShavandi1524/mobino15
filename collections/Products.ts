import type { CollectionConfig } from "payload";

export const Products: CollectionConfig = {
  slug: "products",

  fields: [
    //**        آدرس محصول         */
    {
      name: "productAddress",
      type: "text",
      required: true,
    },
    {
      name: "address",
      type: "text",
      required: true,
    },
    {
      name: "order",
      type: "number",
      required: true,
      unique: true,

      admin: {
        description: "اعداد کوچکتر در بالای لیست نمایش داده می‌شوند.",
      },
    },
    //**       اسم انگلیسی         */
    {
      name: "name",
      label: "en title",
      type: "text",
      required: true,
    },
    //**       اسم فارسیش          */
    {
      name: "label",
      label: "persian title",
      type: "text",
      required: true,
    },
    //**        رنگ          */
    {
      name: "color",
      type: "select",
      required: true,
      options: [
        { label: "مشکی تیتانیوم", value: "TitaniumBlack" },
        { label: "مشکی", value: "Black" },
        { label: "نقره‌ای", value: "Silver" },
        { label: "بنفش", value: "Purple" },
        { label: "زرد", value: "yellow" },
        { label: "آبی تیره", value: "DarkBlue" },
        { label: "لیمویی", value: "Lemon" },
        { label: "نقره ای تیتانیوم", value: "TitaniumSilver" },
        { label: "خاکستری تیره", value: "DarkGray" },
        { label: "نچرال تیتانیوم", value: "NaturalTitanium" },
        { label: "طلایی", value: "Golden" },
        { label: "خاکستری تیتانیوم", value: "TitaniumGray" },
        { label: "آبی یخی تیتانیوم", value: "TitaniumIceBlue" },
        { label: "خاکستری", value: "Gray" },
        { label: "سرمه‌ای", value: "NavyBlue" },
        { label: "آجری", value: "Brick" },
        { label: "صحرایی تیتانیوم", value: "TitaniumDesert" },
        { label: "بنفش تیتانیوم", value: "TitaniumPurple" },
        { label: "جت‌بلک تیتانیوم", value: "JetBlackTitanium" },
        { label: "سبز روشن", value: "LightGreen" },
        { label: "فیروزه‌ای", value: "Turquoise" },
        { label: "خاکستری روشن", value: "LightGray" },
        { label: "آبی روشن", value: "LightBlue" },
        { label: "صورتی", value: "Pink" },
        { label: "سفید تیتانیوم", value: "TitaniumWhite" },
        { label: "سبز", value: "Green" },
        { label: "کرم", value: "Cream" },
        { label: "آبی", value: "Blue" },
        { label: "سفید", value: "White" },
        { label: "قرمز", value: "Red" },
        { label: "نارنجی", value: "Orange" },
        { label: "گرافیتی", value: "graphite" },
        { label: "آبی اقیانوسی", value: "oceanBlue" },
        { label: "رزگلد", value: "roseGold" },
        { label: "سبز زیتونی", value: "oliveGreen" },
        { label: "مسی", value: "copper" },
        { label: "برنز", value: "bronze" },
        { label: "نوک‌مدادی", value: "charcoalGray" },
        { label: "آبی آسمانی", value: "skyBlue" },
        { label: "یاسی", value: "lilac" },
        { label: "سبز نعنایی", value: "mintGreen" },
      ],
    },
    //**      قیمت          */
    {
      name: "price",
      type: "number",
      required: true,
    },
    //**      قیمت تخفیف خورده          */
    {
      name: "offPrice",
      type: "number",
    },

    // ? relation ship fields

    {
      name: "category",
      type: "relationship",
      relationTo: "categories",
      maxDepth: 0,
      required: true,
    },
    {
      name: "subCategory",
      type: "relationship",
      relationTo: "categories",
      maxDepth: 0,
      required: true,
    },

    // ?

    //**         لینک تصاویر         **//
    {
      name: "images",
      type: "array",
      label: "image urls",
      fields: [
        {
          name: "url",
          type: "text",
          label: "image url",
          required: true,
        },
        {
          name: "isMain",
          type: "checkbox",
          label: "main image ?",
          defaultValue: false,
        },
      ],
    },

    //**          تعداد        **//
    {
      name: "quantity",
      type: "number",
      required: true,
    },

    //**          امتیاز        **//
    {
      name: "rating",
      type: "number",
      required: true,
      max: 5,
      min: 3,
    },

    //**         معرفی محصول یا توضیحی راجع به محصول          **//
    {
      name: "introduction",
      type: "textarea",
      required: true,
    },

    //**        موجودیت           **//

    {
      name: "available",
      type: "checkbox",
      defaultValue: true,
    },

    //**?       product Type    blocks       **//

    {
      name: "productType",
      type: "blocks",
      label: "product Type",

      blocks: [
        {
          slug: "mobile",
          fields: [
            //**        برند           **//
            {
              name: "brand",
              label: "Brand",
              type: "select",
              options: [
                { label: "Apple", value: "apple" },
                { label: "Samsung", value: "samsung" },
                { label: "Xiaomi", value: "xiaomi" },
                { label: "Huawei", value: "huawei" },
                { label: "Nokia", value: "nokia" },
                { label: "Sony", value: "sony" },
              ],
              required: true,
            },

            //**          مدل گوشی        **//

            {
              name: "model",
              label: "Model",
              type: "text",
              required: true,
            },
            //**          دسته بندی گوشی        **//

            {
              name: "classification",
              type: "select",
              options: [
                { label: "اقتصادی", value: "Economic" },
                { label: "پرچم‌دار", value: "FlagBearer" },
                { label: "‌میان‌رده", value: "MidRange" },
              ],
              admin: {
                description: "دسته بندی گوشی ",
              },
            },
            //**         رم         **//

            {
              name: "ram",
              label: "RAM",
              type: "select",
              options: [
                { label: "4 GB", value: "4gb" },
                { label: "6 GB", value: "6gb" },
                { label: "8 GB", value: "8gb" },
                { label: "12 GB", value: "12gb" },
                { label: "16 GB", value: "16gb" },
              ],
              required: true,
            },

            //**         حافظه         **//

            {
              name: "storage",
              label: "Storage",
              type: "select",
              options: [
                { label: "64 GB", value: "64gb" },
                { label: "128 GB", value: "128gb" },
                { label: "256 GB", value: "256gb" },
                { label: "512 GB", value: "512gb" },
                { label: "1 TB", value: "1tb" },
              ],
              required: true,
            },

            //**         سیستم عامل         **//

            {
              name: "os",
              label: "Operating System",
              type: "select",
              options: [
                { label: "iOS", value: "ios" },
                { label: "Android", value: "android" },
                { label: "HarmonyOS", value: "harmony" },
              ],
              required: true,
              admin: {
                description: "سیستم عامل",
              },
            },

            //**         ظرفیت باتری         **//

            {
              name: "batteryCapacity",
              label: "Battery (mAh)",
              type: "number",
              required: true,
            },

            //**         وضوح دوربین اصلی         **//
            {
              name: "mainCameraResolution",
              label: "Main Camera (MP)",
              type: "number",
              required: true,
            },

            //**         وضوح دوربین جلو         **//

            {
              name: "FrontCameraResolution",
              label: "Front camera resolution",
              type: "number",
              required: true,
            },

            //**        نوع پردازنده - CPU        **//

            {
              name: "chipset",
              label: "Chipset (CPU)",
              type: "text",
              admin: {
                description: "نوع پردازنده - CPU",
              },
              required: true,
            },

            //**        تعداد هسته پردازشگر        **//
            {
              name: "cpuCores",
              label: "CPU Cores",
              type: "select",
              options: [
                { label: "1 هسته ", value: "1" },
                { label: "2 هسته ", value: "2" },
                { label: "4 هسته ", value: "4" },
                { label: "6 هسته ", value: "6" },
                { label: "8 هسته ", value: "8" },
                { label: "9 هسته ", value: "9" },
                { label: "10 هسته ", value: "10" },
              ],
              admin: {
                description: "تعداد هسته پردازشگر",
              },
              required: true,
            },

            //**        پردازنده گرافیکی - GPU          **//
            {
              name: "gpu",
              label: "GPU",
              type: "text",
              admin: {
                description: "پردازنده گرافیکی - GPU :",
              },
              required: true,
            },

            //**         تعداد سیم کارت           **//

            {
              name: "simCount",
              label: "sim cards count",
              type: "select",
              options: [
                { label: "تک سیم‌کارت", value: "1" },
                { label: "دو سیم‌کارت", value: "2" },
              ],

              required: true,
            },

            //**           ابعاد            **//

            {
              name: "dimensions",
              label: "Dimensions (mm)",
              type: "text",
              required: true,
            },

            //**         وزن         **//

            {
              name: "weight",
              label: "Weight (grams)",
              type: "number",
              required: true,
            },

            //**         وضعیت رجیستر         **//

            {
              name: "isRegistered",
              label: "Registered (رجیستر شده)",
              type: "checkbox",
            },

            //**         نوع صفحه نمایش         **//

            {
              name: "displayType",
              label: "Display Type",
              type: "select",
              options: [
                { label: "IPS LCD", value: "ips" },
                { label: "OLED", value: "oled" },
                { label: "AMOLED", value: "amoled" },
                { label: "Super AMOLED", value: "super_amoled" },
                { label: "Dynamic AMOLED", value: "dynamic_amoled" },
              ],
              required: true,
            },

            //**        سایز صفحه نمایش          **//

            {
              name: "displaySize",
              label: "Display Size (inches)",
              type: "text",
              required: true,
            },

            //**        وضوح نمایش          **//

            {
              name: "displayResolution",
              label: "Resolution / Colors",
              type: "text",
              required: true,
            },

            //**         نرخ تازه‌سازی        **//

            {
              name: "refreshRate",
              label: "Refresh Rate (Hz)",
              type: "number",
              required: true,
            },

            //**         شبکه اینترنت         **//

            {
              name: "network",
              label: "Internet Network",
              type: "select",
              options: [
                { label: "2G", value: "2g" },
                { label: "3G", value: "3g" },
                { label: "4G", value: "4g" },
                { label: "5G", value: "5g" },
              ],
              required: true,
            },

            //**        وضعیت ضد آب           **//

            {
              name: "waterResistant",
              label: "Water Resistant",
              type: "checkbox",
            },

            //**         اقلام همراه          **//

            { name: "accessories", label: "Accessories in Box", type: "text" },
          ],
        },
        {
          slug: "laptop",
          fields: [
            //**        برند لپتاپ          **//

            {
              name: "brand",
              label: "Brand",
              type: "select",
              options: [
                { label: "Apple", value: "apple" },
                { label: "Asus", value: "asus" },
                { label: "HP", value: "hp" },
                { label: "Lenovo", value: "lenovo" },
                { label: "MSI", value: "msi" },
                { label: "Dell", value: "dell" },
                { label: "Acer", value: "acer" },
              ],
              required: true,
            },

            //**        مدل لپ تاپ          **//

            {
              name: "model",
              label: "Model",
              type: "text",
              required: true,
            },

            //**        رم لپ تاپ          **//

            {
              name: "ram",
              label: "RAM",
              type: "select",
              options: [
                { label: "2 گیگابایت", value: "2gb" },
                { label: "4 گیگابایت", value: "4gb" },
                { label: "8 گیگابایت", value: "8gb" },
                { label: "12 گیگابایت", value: "12gb" },
                { label: "16 گیگابایت", value: "16gb" },
                { label: "20 گیگابایت", value: "20gb" },
                { label: "24 گیگابایت", value: "28gb" },
                { label: "32 گیگابایت", value: "32gb" },
                { label: "36 گیگابایت", value: "36gb" },
                { label: "40 گیگابایت", value: "40gb" },
                { label: "44 گیگابایت", value: "44gb" },
                { label: "48 گیگابایت", value: "48gb" },
                { label: "64 گیگابایت", value: "64gb" },
                { label: "128 گیگابایت", value: "128gb" },
              ],
              required: true,
            },

            //**        قابلیت ارتقای رم لپ تاپ          **//

            {
              name: "AbilityToUpgradeLaptopRAM",
              type: "checkbox",
              defaultValue: false,
            },

            //**         نوع حافظه ذخیره سازی و حافظه         **//

            {
              name: "storages",
              label: "Storages",
              type: "array",
              required: true,
              fields: [
                {
                  name: "type",
                  label: "Type",
                  type: "select",
                  options: [
                    { label: "SSD", value: "ssd" },
                    { label: "HDD", value: "hdd" },
                  ],
                  required: true,
                },
                {
                  name: "capacity",
                  label: "Capacity",
                  type: "select",
                  options: [
                    { label: "64 گیگا بایت", value: "64gb" },
                    { label: "128 گیگا بایت", value: "128gb" },
                    { label: "256 گیگا بایت", value: "256gb" },
                    { label: "512 گیگا بایت", value: "512gb" },
                    { label: "1 ترابایت", value: "1tb" },
                    { label: "2 ترابایت", value: "2tb" },
                    { label: "4 ترابایت", value: "4tb" },
                  ],
                  required: true,
                },
              ],
            },

            //**        قابلیت ارتقای حافظه لپ تاپ          **//

            {
              name: "AbilityToUpgradeLaptopStorage",
              type: "checkbox",
              defaultValue: false,
            },

            //**         نوع کاربری         **//

            {
              name: "usage",
              type: "select",
              options: [
                "صنعتی",
                "حرفه ای",
                "مالتی مدیا",
                "دسکتاپ",
                "طراحی",
                "عمومی",
                "گیمینگ",
              ],
              required: true,
            },

            //**       cpu  سری پردازنده         **//
            {
              name: "cpuSeries",
              label: "CPU Series",
              type: "select",
              required: true,
              options: [
                // Intel Series
                { label: "Intel Core i3", value: "intel_i3" },
                { label: "Intel Core i5", value: "intel_i5" },
                { label: "Intel Core i7", value: "intel_i7" },
                { label: "Intel Core i9", value: "intel_i9" },
                { label: "Intel Pentium", value: "intel_pentium" },
                { label: "Intel Celeron", value: "intel_celeron" },
                { label: "Intel Xeon", value: "intel_xeon" },

                // AMD Series
                { label: "AMD Ryzen 3", value: "amd_ryzen3" },
                { label: "AMD Ryzen 5", value: "amd_ryzen5" },
                { label: "AMD Ryzen 7", value: "amd_ryzen7" },
                { label: "AMD Ryzen 9", value: "amd_ryzen9" },
                { label: "AMD Athlon", value: "amd_athlon" },
                { label: "AMD FX", value: "amd_fx" },

                // Apple Silicon
                { label: "Apple M1", value: "apple_m1" },
                { label: "Apple M2", value: "apple_m2" },
                { label: "Apple M3", value: "apple_m3" },

                // سایر موارد خاص
                { label: "Other", value: "other" },
              ],
            },

            //**      cpu  نسل پزدازنده          **//

            {
              name: "CPUProcessorGeneration",
              type: "select",
              options: ["10", "11", "12", "13", "14"],
              required: true,
            },

            //**         مدل گرافیک       **//

            {
              name: "gpuInfo",
              label: "GPU Information",
              type: "group",
              fields: [
                {
                  name: "series",
                  label: "GPU Series",
                  type: "select",
                  required: true,
                  options: [
                    { label: "NVIDIA GeForce MX", value: "nvidia_mx" },
                    { label: "NVIDIA GeForce GTX", value: "nvidia_gtx" },
                    { label: "NVIDIA GeForce RTX", value: "nvidia_rtx" },
                    { label: "NVIDIA Quadro", value: "nvidia_quadro" },
                    { label: "AMD Radeon RX", value: "amd_rx" },
                    { label: "AMD Radeon Vega", value: "amd_vega" },
                    { label: "AMD Radeon Pro", value: "amd_pro" },
                    { label: "Intel Iris Xe", value: "intel_iris_xe" },
                    { label: "Intel UHD", value: "intel_uhd" },
                    {
                      label: "Apple M1/M2/M3 GPU",
                      value: "apple_m_series_gpu",
                    },
                    { label: "Other", value: "other" },
                  ],
                },
                {
                  name: "model",
                  label: "GPU Model",
                  type: "text",
                  required: true,
                },
              ],
            },

            //**        ابعاد نمایشگر          **//

            {
              name: "DisplaySize",
              label: "Display Size (inches)",
              type: "number",
            },

            //**         رزولوشن         **//

            {
              name: "screenResolution",
              label: "Display Resolution",
              type: "select",
              required: true,
              options: [
                { label: "HD (1366×768)", value: "hd1366x768" },
                { label: "Full HD (1920×1080)", value: "fullHd1920x1080" },
                { label: "2K (2560×1440)", value: "qhd2560x1440" },
                { label: "WQHD (2560×1600)", value: "wqhd2560x1600" },
                { label: "3K (2880×1620)", value: "threeK2880x1620" },
                { label: "Retina (2880×1800)", value: "retina2880x1800" },
                { label: "4K UHD (3840×2160)", value: "uhd4k3840x2160" },
                { label: "WUXGA (1920×1200)", value: "wuxga1920x1200" },
                { label: "WXGA (1280×800)", value: "wxga1280x800" },
                { label: "QHD+ (3200×1800)", value: "qhdPlus3200x1800" },
                { label: "5K (5120×2880)", value: "fiveK5120x2880" },
                { label: "6K (6016×3384)", value: "sixK6016x3384" },
              ],
            },

            //**        اقلام همراه          **//

            {
              name: "accessories",
              label: "Accessories in Box",
              type: "text",
              required: true,
            },
          ],
        },

        {
          slug: "tablet",
          fields: [
            //**        برند           **//
            {
              name: "brand",
              label: "Brand",
              type: "select",
              options: [
                { label: "Apple", value: "apple" },
                { label: "Samsung", value: "samsung" },
                { label: "Xiaomi", value: "xiaomi" },
                { label: "Huawei", value: "huawei" },
                { label: "Lenovo", value: "lenovo" },
                { label: "Microsoft", value: "microsoft" },
              ],
              required: true,
            },

            //**          مدل تبلت        **//
            {
              name: "model",
              label: "Model",
              type: "text",
              required: true,
            },

            //**          دسته‌بندی        **//
            {
              name: "classification",
              type: "select",
              options: [
                { label: "اقتصادی", value: "Economic" },
                { label: "پرچم‌دار", value: "FlagBearer" },
                { label: "میان‌رده", value: "MidRange" },
              ],
              admin: { description: "دسته‌بندی تبلت" },
            },

            //**         رم         **//
            {
              name: "ram",
              label: "RAM",
              type: "select",
              options: [
                { label: "3 GB", value: "3gb" },
                { label: "4 GB", value: "4gb" },
                { label: "6 GB", value: "6gb" },
                { label: "8 GB", value: "8gb" },
                { label: "12 GB", value: "12gb" },
                { label: "16 GB", value: "16gb" },
              ],
              required: true,
            },

            //**         حافظه         **//
            {
              name: "storage",
              label: "Storage",
              type: "select",
              options: [
                { label: "32 GB", value: "32gb" },
                { label: "64 GB", value: "64gb" },
                { label: "128 GB", value: "128gb" },
                { label: "256 GB", value: "256gb" },
                { label: "512 GB", value: "512gb" },
                { label: "1 TB", value: "1tb" },
              ],
              required: true,
            },

            //**         سیستم عامل         **//
            {
              name: "os",
              label: "Operating System",
              type: "select",
              options: [
                { label: "iPadOS", value: "ipados" },
                { label: "Android", value: "android" },
                { label: "Windows", value: "windows" },
              ],
              required: true,
            },

            //**         ظرفیت باتری         **//
            {
              name: "batteryCapacity",
              label: "Battery (mAh)",
              type: "number",
              required: true,
            },

            //**         دوربین اصلی         **//
            {
              name: "mainCameraResolution",
              label: "Main Camera (MP)",
              type: "number",
            },

            //**         دوربین جلو         **//
            {
              name: "frontCameraResolution",
              label: "Front Camera (MP)",
              type: "number",
            },

            //**         چیپست پردازنده         **//
            {
              name: "chipset",
              label: "Chipset (CPU)",
              type: "text",
              required: true,
            },

            //**        تعداد هسته پردازنده         **//
            {
              name: "cpuCores",
              label: "CPU Cores",
              type: "select",
              options: [
                { label: "2", value: "2" },
                { label: "4", value: "4" },
                { label: "6", value: "6" },
                { label: "8", value: "8" },
                { label: "10", value: "10" },
              ],
              required: true,
            },

            //**         GPU         **//
            {
              name: "gpu",
              label: "GPU",
              type: "text",
              required: true,
            },

            //**         پشتیبانی از سیم‌کارت         **//
            {
              name: "simSupport",
              label: "SIM Support",
              type: "select",
              options: [
                { label: "ندارد", value: "none" },
                { label: "تک سیم‌کارت", value: "1" },
                { label: "دو سیم‌کارت", value: "2" },
              ],
            },

            //**         ابعاد         **//
            {
              name: "dimensions",
              label: "Dimensions (mm)",
              type: "text",
              required: true,
            },

            //**         وزن         **//
            {
              name: "weight",
              label: "Weight (grams)",
              type: "number",
              required: true,
            },

            //**         رجیستر شده         **//
            {
              name: "isRegistered",
              label: "Registered",
              type: "checkbox",
            },

            //**         نوع نمایشگر         **//
            {
              name: "displayType",
              label: "Display Type",
              type: "select",
              options: [
                { label: "IPS LCD", value: "ips" },
                { label: "TFT", value: "tft" },
                { label: "OLED", value: "oled" },
                { label: "AMOLED", value: "amoled" },
              ],
              required: true,
            },

            //**         سایز نمایشگر         **//
            {
              name: "displaySize",
              label: "Display Size (inches)",
              type: "text",
              required: true,
            },

            //**         وضوح نمایشگر         **//
            {
              name: "displayResolution",
              label: "Resolution",
              type: "text",
              required: true,
            },

            //**         نرخ تازه‌سازی نمایشگر         **//
            {
              name: "refreshRate",
              label: "Refresh Rate (Hz)",
              type: "number",
            },

            //**         شبکه ارتباطی         **//
            {
              name: "network",
              label: "Internet Network",
              type: "select",
              options: [
                { label: "WiFi Only", value: "wifi" },
                { label: "4G", value: "4g" },
                { label: "5G", value: "5g" },
              ],
              required: true,
            },

            //**         مقاومت در برابر آب         **//
            {
              name: "waterResistant",
              label: "Water Resistant",
              type: "checkbox",
            },

            //**         اقلام همراه         **//
            {
              name: "accessories",
              label: "Accessories in Box",
              type: "text",
            },
          ],
        },
      ],
    },
  ],
};
