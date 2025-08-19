import {
  ProductOverview,
  Content,
  ExtraContent,
  MainTitle,
  Title,
  Paragraph,
} from "../ProductOverview";

const AppleLaptopOverview = () => {
  return (
    <ProductOverview>
      <Content>
        <MainTitle label="لپ‌تاپ اپل" />
        <Paragraph>
          لپ‌تاپ‌های اپل با سیستم‌عامل macOS و طراحی بی‌نظیر، گزینه‌ای محبوب
          برای کاربران حرفه‌ای، طراحان گرافیک، برنامه‌نویسان و دانشجویان هستند.
          کیفیت ساخت بالا، پردازنده‌های قدرتمند و یکپارچگی نرم‌افزاری، تجربه‌ای
          روان و متمایز ارائه می‌دهد.
        </Paragraph>
      </Content>

      <ExtraContent>
        <Title label="سری‌ها و مدل‌ها" />
        <Paragraph>
          اپل سری MacBook را در دو دسته MacBook Air و MacBook Pro ارائه می‌دهد.
          MacBook Air مناسب کاربران سبک و دانشجویان است و MacBook Pro با قدرت
          پردازشی بالا، برای حرفه‌ای‌ها و تولید محتوا ایده‌آل است.
        </Paragraph>

        <Title label="نوآوری و تکنولوژی" />
        <Paragraph>
          اپل با پردازنده‌های Apple M1 و M2، نمایشگرهای Retina با کیفیت عالی و
          باتری با دوام بالا، تجربه‌ای بی‌نظیر برای کاربران فراهم می‌کند. طراحی
          یکپارچه سخت‌افزار و نرم‌افزار، سرعت و کارایی بالایی ایجاد می‌کند.
        </Paragraph>

        <Title label="تعادل بین قیمت و کیفیت" />
        <Paragraph>
          لپ‌تاپ‌های اپل معمولاً قیمت بالاتری دارند، اما کیفیت، دوام و تجربه
          کاربری متمایز، ارزش خرید آن‌ها را بالا می‌برد. کاربران حرفه‌ای که به
          عملکرد و یکپارچگی سیستم اهمیت می‌دهند، از انتخاب خود رضایت خواهند
          داشت.
        </Paragraph>

        <Title label="طراحی و تجربه کاربری" />
        <Paragraph>
          طراحی شیک، وزن سبک، کیفیت ساخت عالی و تجربه کاربری روان، استفاده
          روزمره و حرفه‌ای را لذت‌بخش می‌کند. لپ‌تاپ‌های اپل با ارائه ترکیبی از
          زیبایی و عملکرد بالا، رضایت کاربران را جلب می‌کنند.
        </Paragraph>
      </ExtraContent>
    </ProductOverview>
  );
};

export default AppleLaptopOverview;
