import {
  ProductOverview,
  Content,
  CustomLink,
  ExtraContent,
  MainTitle,
  Paragraph,
  Title,
} from "../ProductOverview";

const HeadphoneOverview = () => {
  return (
    <ProductOverview>
      {/* توضیحات اصلی */}
      <Content>
        <MainTitle label="خرید هدفون از موبینو" />
        <Paragraph>
          هدفون‌ها یکی از پرکاربردترین لوازم جانبی دیجیتال هستند که تجربه‌ی
          گوش دادن به موسیقی، برقراری تماس و حتی گیمینگ را لذت‌بخش‌تر می‌کنند.
          در فروشگاه <CustomLink href="/" label="موبینو" /> می‌توانید انواع
          هدفون از برندهای معتبر را با بهترین قیمت تهیه کنید.
        </Paragraph>

        <Title label="برندهای محبوب هدفون" />
        <Paragraph>
          موبینو مجموعه‌ای از بهترین برندهای هدفون را ارائه می‌دهد؛ از جمله{" "}
          <CustomLink href="/Headphones/TscoHeadphones" label="تسکو (Tsco)" />،{" "}
          <CustomLink href="/Headphones/AnkerHeadphones" label="انکر (Anker)" />،{" "}
          <CustomLink href="/Headphones/RazerHeadphones" label="ریزر (Razer)" /> و{" "}
          <CustomLink href="/Headphones/BeatsHeadphones" label="بیتس (Beats)" />.
        </Paragraph>
      </Content>

      {/* توضیحات بیشتر */}
      <ExtraContent>
        <Title label="هدفون Tsco" />
        <Paragraph>
          برند <CustomLink href="/Headphones/TscoHeadphones" label="تسکو" /> به
          دلیل قیمت مناسب و تنوع مدل‌ها، گزینه‌ای عالی برای کاربران روزمره است.
          این هدفون‌ها معمولاً کیفیت صدای قابل قبولی با طراحی ارگونومیک ارائه می‌دهند.
        </Paragraph>

        <Title label="هدفون Anker" />
        <Paragraph>
          <CustomLink href="/Headphones/AnkerHeadphones" label="انکر" /> یکی از
          برندهای محبوب در زمینه لوازم جانبی دیجیتال است. هدفون‌های این برند
          به‌ویژه در زمینه باتری و کیفیت اتصال بی‌سیم شناخته می‌شوند.
        </Paragraph>

        <Title label="هدفون Razer" />
        <Paragraph>
          اگر به دنبال هدفون گیمینگ هستید،{" "}
          <CustomLink href="/Headphones/RazerHeadphones" label="ریزر" /> یکی از
          بهترین انتخاب‌هاست. کیفیت صدای Surround و طراحی مناسب گیمرها از
          ویژگی‌های اصلی این برند است.
        </Paragraph>

        <Title label="هدفون Beats" />
        <Paragraph>
          <CustomLink href="/Headphones/BeatsHeadphones" label="بیتس" /> از
          محبوب‌ترین برندهای هدفون در دنیاست. طراحی شیک، بیس قوی و کیفیت صدای
          حرفه‌ای باعث شده محصولات این برند میان جوانان و علاقه‌مندان به موسیقی
          بسیار پرطرفدار باشند.
        </Paragraph>

        <Title label="راهنمای خرید هدفون" />
        <Paragraph>
          هنگام خرید هدفون باید به عواملی مانند نوع اتصال (سیمی یا بی‌سیم)،
          کیفیت صدا، میزان بیس، پشتیبانی از فناوری نویز کنسلینگ، ظرفیت باتری و
          راحتی در استفاده طولانی‌مدت توجه کنید.
        </Paragraph>
      </ExtraContent>
    </ProductOverview>
  );
};

export default HeadphoneOverview;
