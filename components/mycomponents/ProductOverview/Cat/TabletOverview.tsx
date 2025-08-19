import {
  ProductOverview,
  Content,
  CustomLink,
  ExtraContent,
  MainTitle,
  Paragraph,
  Title,
} from "../ProductOverview";

const TabletOverview = () => {
  return (
    <ProductOverview>
      {/* توضیحات اصلی */}
      <Content>
        <MainTitle label="خرید تبلت از موبینو" />
        <Paragraph>
          تبلت‌ها ترکیبی از قابلیت‌های گوشی موبایل و لپ‌تاپ هستند و به‌عنوان
          دستگاهی کاربردی برای مطالعه، تماشای فیلم، طراحی، آموزش و حتی کارهای
          حرفه‌ای شناخته می‌شوند. در فروشگاه{" "}
          <CustomLink href="/" label="موبینو" /> می‌توانید انواع تبلت از برندهای
          معتبر جهانی را بررسی کرده و خریدی مطمئن انجام دهید.
        </Paragraph>

        <Title label="برندهای محبوب تبلت" />
        <Paragraph>
          موبینو مجموعه‌ای کامل از برندهای مختلف را در اختیار شما قرار داده است؛
          از جمله{" "}
          <CustomLink href="/tablet/LenovoTablet" label="لنوو (Lenovo)" />،
          <CustomLink
            href="/tablet/MicrosoftTablet"
            label="مایکروسافت (Microsoft)"
          />
          ،
          <CustomLink
            href="/tablet/SamsungTablet"
            label="سامسونگ (Samsung)"
          />{" "}
          و
          <CustomLink href="/tablet/AppleTablet" label="اپل (Apple)" />. هر کدام
          از این برندها متناسب با نیازهای کاربران، تبلت‌های متنوعی ارائه
          می‌دهند.
        </Paragraph>
      </Content>

      {/* توضیحات بیشتر */}
      <ExtraContent>
        <Title label="تبلت Lenovo" />
        <Paragraph>
          تبلت‌های <CustomLink href="/tablet/LenovoTablet" label="لنوو" /> به
          دلیل قیمت مناسب و کارایی بالا، انتخاب محبوبی برای دانشجویان و کاربران
          روزمره هستند. سری‌های Tab M و Tab P این برند جزو پرطرفدارترین محصولات
          بازار محسوب می‌شوند.
        </Paragraph>

        <Title label="تبلت Microsoft" />
        <Paragraph>
          سری{" "}
          <CustomLink href="/tablet/MicrosoftTablet" label="سرفیس (Surface)" />{" "}
          از مایکروسافت تجربه‌ای نزدیک به لپ‌تاپ را در اختیار شما قرار می‌دهد.
          این تبلت‌ها گزینه‌ای عالی برای کارهای حرفه‌ای و تجاری هستند و به
          سیستم‌عامل Windows مجهزند.
        </Paragraph>

        <Title label="تبلت Samsung" />
        <Paragraph>
          برند <CustomLink href="/tablet/SamsungTablet" label="سامسونگ" /> با
          سری محبوب Galaxy Tab توانسته سهم بزرگی از بازار تبلت را در اختیار
          بگیرد. نمایشگرهای باکیفیت AMOLED و پشتیبانی از قلم S Pen از ویژگی‌های
          مهم این سری است.
        </Paragraph>

        <Title label="تبلت Apple" />
        <Paragraph>
          <CustomLink href="/tablet/AppleTablet" label="آیپدهای اپل" /> از
          محبوب‌ترین و قدرتمندترین تبلت‌های دنیا هستند. تنوع مدل‌ها از iPad Mini
          تا iPad Pro باعث شده همه‌ی کاربران، از دانش‌آموز تا طراح حرفه‌ای،
          گزینه‌ای مناسب پیدا کنند.
        </Paragraph>

        <Title label="راهنمای خرید تبلت" />
        <Paragraph>
          هنگام خرید تبلت بهتر است به عواملی مانند اندازه نمایشگر، پشتیبانی از
          قلم هوشمند، قدرت پردازنده، میزان حافظه RAM، ظرفیت باتری و سیستم‌عامل
          توجه کنید. با فیلترهای موبینو می‌توانید مدل‌های مختلف را با هم مقایسه
          و بهترین انتخاب را داشته باشید.
        </Paragraph>
      </ExtraContent>
    </ProductOverview>
  );
};

export default TabletOverview;
