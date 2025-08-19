import {
  ProductOverview,
  Content,
  ExtraContent,
  MainTitle,
  Title,
  Paragraph,
} from "../ProductOverview";

const AppleTabletOverview = () => {
  return (
    <ProductOverview>
      <Content>
        <MainTitle label="تبلت اپل" />
        <Paragraph>
          تبلت‌های اپل با سیستم‌عامل iPadOS و طراحی بی‌نظیر، گزینه‌ای محبوب برای
          کاربران حرفه‌ای، دانشجویان و علاقه‌مندان به تکنولوژی هستند. کیفیت ساخت
          بالا، عملکرد سریع و یکپارچگی نرم‌افزاری، تجربه‌ای روان و متمایز ارائه
          می‌دهد.
        </Paragraph>
      </Content>

      <ExtraContent>
        <Title label="سری‌ها و مدل‌ها" />
        <Paragraph>
          اپل سری iPad را در مدل‌های iPad، iPad Air، iPad Pro و iPad Mini ارائه
          می‌دهد. هر مدل ویژگی‌ها و امکانات خاص خود را دارد؛ از مدل‌های اقتصادی
          و سبک گرفته تا مدل‌های حرفه‌ای با پردازنده و نمایشگر پیشرفته.
        </Paragraph>

        <Title label="نوآوری و تکنولوژی" />
        <Paragraph>
          اپل با پردازنده‌های قدرتمند M1 و M2، نمایشگرهای Retina با کیفیت عالی و
          باتری با دوام بالا، تجربه‌ای بی‌نظیر برای کاربران فراهم می‌کند. قلم
          Apple Pencil و کیبوردهای جداشدنی، کار با تبلت را مشابه لپ‌تاپ می‌کند.
        </Paragraph>

        <Title label="تعادل بین قیمت و کیفیت" />
        <Paragraph>
          تبلت‌های اپل قیمت بالاتری نسبت به رقبا دارند، اما کیفیت، دوام و تجربه
          کاربری متمایز، ارزش خرید آن‌ها را بالا می‌برد. کاربران حرفه‌ای که به
          عملکرد و یکپارچگی سیستم اهمیت می‌دهند، از انتخاب خود رضایت خواهند
          داشت.
        </Paragraph>

        <Title label="طراحی و تجربه کاربری" />
        <Paragraph>
          طراحی شیک، وزن سبک، کیفیت ساخت عالی و تجربه کاربری روان، استفاده
          روزمره و حرفه‌ای را لذت‌بخش می‌کند. تبلت‌های اپل ترکیبی از زیبایی و
          عملکرد بالا ارائه می‌دهند.
        </Paragraph>
      </ExtraContent>
    </ProductOverview>
  );
};

export default AppleTabletOverview;
