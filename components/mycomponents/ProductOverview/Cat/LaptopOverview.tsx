import {
  ProductOverview,
  Content,
  CustomLink,
  ExtraContent,
  MainTitle,
  Paragraph,
  Title,
} from "../ProductOverview";

const LaptopOverview = () => {
  return (
    <ProductOverview>
      {/* توضیحات اصلی */}
      <Content>
        <MainTitle label="خرید لپ‌تاپ از موبینو" />
        <Paragraph>
          لپ‌تاپ به عنوان یکی از مهم‌ترین ابزارهای کاری، تحصیلی و سرگرمی در
          زندگی روزمره، اهمیت زیادی دارد. کاربران متناسب با نیاز خود، لپ‌تاپ را
          برای کارهای روزمره، برنامه‌نویسی، طراحی، تولید محتوا یا گیمینگ انتخاب
          می‌کنند. فروشگاه <CustomLink href="/" label="موبینو" /> مجموعه‌ای
          متنوع از لپ‌تاپ‌های برندهای معتبر جهانی را فراهم کرده است تا شما
          بتوانید انتخابی مطمئن و هوشمندانه داشته باشید.
        </Paragraph>

        <Title label="برندهای پرفروش لپ‌تاپ" />
        <Paragraph>
          در موبینو می‌توانید لپ‌تاپ‌های برندهای مطرحی چون
          <CustomLink href="/laptop/DellLaptop" label="دل (Dell)" />،
          <CustomLink href="/laptop/MSILaptop" label="ام‌اس‌آی (MSI)" />،
          <CustomLink href="/laptop/AcerLaptop" label="ایسر (Acer)" />،
          <CustomLink href="/laptop/HPLaptop" label="اچ‌پی (HP)" />،
          <CustomLink href="/laptop/lenovoLaptop" label="لنوو (Lenovo)" />،
          <CustomLink href="/laptop/asusLaptop" label="ایسوس (Asus)" /> و
          <CustomLink href="/laptop/appleLaptop" label="اپل (Apple)" /> را
          مشاهده و خریداری کنید. هر کدام از این برندها متناسب با نیازهای مختلف
          کاربران محصولات متنوعی را ارائه داده‌اند.
        </Paragraph>
      </Content>

      {/* توضیحات بیشتر */}
      <ExtraContent>
        <Title label="لپ‌تاپ Dell" />
        <Paragraph>
          لپ‌تاپ‌های <CustomLink href="/laptop/DellLaptop" label="دل" /> به
          کیفیت ساخت بالا، دوام طولانی و طراحی حرفه‌ای مشهورند. این برند انتخابی
          عالی برای دانشجویان، کارمندان و حتی گیمرها محسوب می‌شود.
        </Paragraph>

        <Title label="لپ‌تاپ MSI" />
        <Paragraph>
          اگر به دنبال یک لپ‌تاپ قدرتمند برای گیمینگ یا کارهای سنگین هستید،
          <CustomLink href="/laptop/MSILaptop" label="ام‌اس‌آی (MSI)" /> یکی از
          بهترین گزینه‌هاست. کارت گرافیک قوی و سیستم خنک‌کننده‌ی عالی از
          ویژگی‌های برجسته لپ‌تاپ‌های MSI است.
        </Paragraph>

        <Title label="لپ‌تاپ Acer" />
        <Paragraph>
          برند <CustomLink href="/laptop/AcerLaptop" label="ایسر (Acer)" /> با
          ارائه‌ی لپ‌تاپ‌های اقتصادی و میان‌رده، انتخابی مناسب برای کسانی است که
          به دنبال کیفیت خوب با قیمت مناسب هستند.
        </Paragraph>

        <Title label="لپ‌تاپ HP" />
        <Paragraph>
          لپ‌تاپ‌های <CustomLink href="/laptop/HPLaptop" label="اچ‌پی (HP)" />{" "}
          تنوع بسیار زیادی دارند؛ از مدل‌های اداری و دانشجویی تا مدل‌های حرفه‌ای
          برای کارهای تخصصی. این برند به عمر باتری خوب و کیفیت قطعات شناخته
          می‌شود.
        </Paragraph>

        <Title label="لپ‌تاپ Lenovo" />
        <Paragraph>
          برند <CustomLink href="/laptop/lenovoLaptop" label="لنوو (Lenovo)" />{" "}
          با سری‌های محبوب ThinkPad و IdeaPad توانسته جایگاه ویژه‌ای در بازار
          داشته باشد. لپ‌تاپ‌های لنوو به خاطر کیبورد عالی و دوام بالا، بین
          کاربران حرفه‌ای بسیار محبوب‌اند.
        </Paragraph>

        <Title label="لپ‌تاپ Asus" />
        <Paragraph>
          لپ‌تاپ‌های{" "}
          <CustomLink href="/laptop/asusLaptop" label="ایسوس (Asus)" /> به طراحی
          زیبا، سخت‌افزار قدرتمند و قیمت رقابتی شهرت دارند. سری‌های VivoBook و
          ROG از پرطرفدارترین مدل‌های این برند هستند.
        </Paragraph>

        <Title label="لپ‌تاپ Apple" />
        <Paragraph>
          لپ‌تاپ‌های{" "}
          <CustomLink href="/laptop/appleLaptop" label="اپل (Apple)" /> یا همان
          مک‌بوک‌ها به خاطر سیستم‌عامل اختصاصی macOS، طراحی منحصربه‌فرد و کیفیت
          ساخت بی‌نظیر شناخته می‌شوند. این لپ‌تاپ‌ها انتخابی عالی برای تولید
          کنندگان محتوا و طراحان هستند.
        </Paragraph>

        <Title label="راهنمای خرید لپ‌تاپ" />
        <Paragraph>
          هنگام خرید لپ‌تاپ باید به عواملی چون نوع پردازنده، میزان RAM، ظرفیت
          حافظه SSD یا HDD، کارت گرافیک و همچنین وزن و شارژدهی دستگاه توجه کنید.
          در موبینو می‌توانید با استفاده از فیلترهای کاربردی، مدل‌های مختلف را
          با هم مقایسه کرده و انتخابی دقیق داشته باشید.
        </Paragraph>
      </ExtraContent>
    </ProductOverview>
  );
};

export default LaptopOverview;
