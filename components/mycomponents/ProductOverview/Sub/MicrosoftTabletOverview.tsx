import {
  ProductOverview,
  Content,
  ExtraContent,
  MainTitle,
  Title,
  Paragraph,
} from "../ProductOverview";

const MicrosoftTabletOverview = () => {
  return (
    <ProductOverview>
      <Content>
        <MainTitle label="تبلت مایکروسافت" />
        <Paragraph>
          تبلت‌های مایکروسافت با سیستم‌عامل ویندوز، ترکیبی از قدرت پردازشی و
          انعطاف‌پذیری ارائه می‌دهند. این محصولات مناسب کاربران حرفه‌ای،
          دانشجویان و علاقه‌مندان به کار با نرم‌افزارهای ویندوزی هستند.
        </Paragraph>
      </Content>

      <ExtraContent>
        <Title label="سری‌ها و مدل‌ها" />
        <Paragraph>
          سری Surface مایکروسافت شامل مدل‌هایی مانند Surface Pro و Surface Go
          است. هر مدل با ویژگی‌ها و قابلیت‌های خاص خود طراحی شده و تجربه کاربری
          متفاوتی ارائه می‌دهد.
        </Paragraph>

        <Title label="نوآوری و تکنولوژی" />
        <Paragraph>
          مایکروسافت با بهره‌گیری از پردازنده‌های Intel و قابلیت‌های لمسی
          پیشرفته، تجربه‌ای روان و کاربردی فراهم می‌کند. قلم دیجیتال Surface Pen
          و صفحه‌کلید جداشدنی، کار با تبلت را مشابه لپ‌تاپ می‌کند.
        </Paragraph>

        <Title label="تعادل بین قیمت و کیفیت" />
        <Paragraph>
          تبلت‌های مایکروسافت قیمت بالاتری نسبت به برخی رقبا دارند، اما کیفیت
          ساخت، دوام و یکپارچگی نرم‌افزاری ارزش خرید آن‌ها را بالا می‌برد.
        </Paragraph>

        <Title label="طراحی و تجربه کاربری" />
        <Paragraph>
          طراحی شیک، وزن مناسب و کیفیت ساخت بالا، تجربه استفاده روزمره و حرفه‌ای
          را راحت و لذت‌بخش می‌کند. تبلت‌های مایکروسافت ترکیبی از قدرت و کارایی
          بالا ارائه می‌دهند.
        </Paragraph>
      </ExtraContent>
    </ProductOverview>
  );
};

export default MicrosoftTabletOverview;
