import {
  ProductOverview,
  Content,
  CustomLink,
  ExtraContent,
  MainTitle,
  Paragraph,
  Title,
} from "../ProductOverview";

const MonitorOverview = () => {
  return (
    <ProductOverview>
      {/* توضیحات اصلی */}
      <Content>
        <MainTitle label="خرید مانیتور از موبینو" />
        <Paragraph>
          مانیتور یکی از اصلی‌ترین ابزارها برای کار، بازی و طراحی است. انتخاب
          درست یک نمایشگر می‌تواند تجربه شما از کاربری روزمره، بازی‌های ویدیویی
          یا فعالیت‌های حرفه‌ای مانند طراحی و تدوین را متحول کند. در{" "}
          <CustomLink href="/" label="فروشگاه موبینو" /> می‌توانید انواع مانیتور
          از برندهای معتبر را با بهترین قیمت و گارانتی معتبر خریداری کنید.
        </Paragraph>

        <Title label="برندهای محبوب مانیتور" />
        <Paragraph>
          موبینو مجموعه‌ای از بهترین برندهای مانیتور را ارائه می‌دهد؛ از جمله{" "}
          <CustomLink href="/Monitor/AcerMonitor" label="ایسر (Acer)" />،{" "}
          <CustomLink href="/Monitor/LGMonitor" label="ال‌جی (LG)" />،{" "}
          <CustomLink href="/Monitor/DellMonitor" label="دل (Dell)" />،{" "}
          <CustomLink
            href="/Monitor/SamsungMonitor"
            label="سامسونگ (Samsung)"
          />{" "}
          و <CustomLink href="/Monitor/ASUSMonitor" label="ایسوس (ASUS)" />.
        </Paragraph>
      </Content>

      {/* توضیحات بیشتر */}
      <ExtraContent>
        <Title label="مانیتور ایسر (Acer)" />
        <Paragraph>
          <CustomLink href="/Monitor/AcerMonitor" label="ایسر" /> با تولید
          مانیتورهای اقتصادی و میان‌رده، انتخابی عالی برای کارهای روزمره و
          دانشجویی است. این برند مانیتورهایی با کیفیت تصویر مناسب و قیمت
          مقرون‌به‌صرفه ارائه می‌دهد.
        </Paragraph>

        <Title label="مانیتور ال‌جی (LG)" />
        <Paragraph>
          <CustomLink href="/Monitor/LGMonitor" label="ال‌جی" /> با مانیتورهای
          UltraWide و IPS کیفیتی مثال‌زدنی برای طراحی، کارهای گرافیکی و
          مولتی‌تسکینگ ارائه می‌دهد. همچنین مانیتورهای گیمینگ LG بین گیمرها
          بسیار محبوب هستند.
        </Paragraph>

        <Title label="مانیتور دل (Dell)" />
        <Paragraph>
          <CustomLink href="/Monitor/DellMonitor" label="دل" /> بیشتر به خاطر
          مانیتورهای حرفه‌ای با رنگ دقیق و طراحی ارگونومیک شناخته می‌شود. این
          مانیتورها برای کارهای اداری و حرفه‌ای بهترین انتخاب هستند.
        </Paragraph>

        <Title label="مانیتور سامسونگ (Samsung)" />
        <Paragraph>
          <CustomLink href="/Monitor/SamsungMonitor" label="سامسونگ" /> با
          پنل‌های VA و QLED تجربه بصری فوق‌العاده‌ای ارائه می‌دهد. مانیتورهای
          خمیده این برند برای گیمینگ و تماشای فیلم گزینه‌ای عالی هستند.
        </Paragraph>

        <Title label="مانیتور ایسوس (ASUS)" />
        <Paragraph>
          <CustomLink href="/Monitor/ASUSMonitor" label="ایسوس" /> به مانیتورهای
          گیمینگ ROG خود معروف است که با نرخ تازه‌سازی بالا و زمان پاسخگویی
          سریع، انتخاب شماره یک گیمرهای حرفه‌ای محسوب می‌شوند.
        </Paragraph>

        <Title label="راهنمای خرید مانیتور" />
        <Paragraph>
          هنگام خرید مانیتور به عواملی مانند اندازه صفحه، نوع پنل (IPS, VA, TN)،
          رزولوشن، نرخ تازه‌سازی (Refresh Rate)، زمان پاسخگویی و همچنین امکاناتی
          مثل HDR یا پورت‌های ورودی توجه کنید. انتخاب درست باعث می‌شود بهترین
          تجربه را در کار و سرگرمی داشته باشید.
        </Paragraph>
      </ExtraContent>
    </ProductOverview>
  );
};

export default MonitorOverview;
