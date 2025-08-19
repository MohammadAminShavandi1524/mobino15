import {
  ProductOverview,
  Content,
  ExtraContent,
  MainTitle,
  Title,
  Paragraph,
} from "../ProductOverview";

const AsusLaptopOverview = () => {
  return (
    <ProductOverview>
      <Content>
        <MainTitle label="لپ‌تاپ ایسوس" />
        <Paragraph>
          لپ‌تاپ‌های ایسوس با تمرکز بر نوآوری، عملکرد و طراحی جذاب، گزینه‌ای عالی
          برای گیمرها، دانشجویان و کاربران حرفه‌ای محسوب می‌شوند. این برند تایوانی
          طیف گسترده‌ای از مدل‌ها با ویژگی‌های متنوع ارائه می‌دهد.
        </Paragraph>
      </Content>

      <ExtraContent>
        <Title label="سری‌ها و مدل‌ها" />
        <Paragraph>
          ایسوس سری‌های متنوعی مانند ZenBook، VivoBook، ROG و TUF ارائه می‌دهد.
          هر سری ویژگی‌ها و امکانات خاص خود را دارد؛ از لپ‌تاپ‌های سبک و نازک تا
          مدل‌های گیمینگ قدرتمند.
        </Paragraph>

        <Title label="نوآوری و تکنولوژی" />
        <Paragraph>
          ایسوس با بهره‌گیری از پردازنده‌های به‌روز، کارت گرافیک‌های NVIDIA و
          نمایشگرهای با کیفیت بالا، تجربه‌ای روان و قدرتمند ارائه می‌دهد. فناوری
          خنک‌کننده و قابلیت‌های اتصال متنوع از دیگر مزایای لپ‌تاپ‌های ایسوس است.
        </Paragraph>

        <Title label="تعادل بین قیمت و کیفیت" />
        <Paragraph>
          لپ‌تاپ‌های ایسوس طیف گسترده‌ای از قیمت‌ها را پوشش می‌دهند. کاربران می‌توانند
          با توجه به نیاز و بودجه خود، بین مدل‌های اقتصادی و حرفه‌ای انتخاب کنند.
        </Paragraph>

        <Title label="طراحی و تجربه کاربری" />
        <Paragraph>
          طراحی زیبا، وزن مناسب و کیفیت ساخت بالا، تجربه‌ای راحت و لذت‌بخش برای
          استفاده روزمره و حرفه‌ای ایجاد می‌کند. ایسوس تلاش کرده ترکیبی از عملکرد و
          زیبایی ارائه دهد.
        </Paragraph>
      </ExtraContent>
    </ProductOverview>
  );
};

export default AsusLaptopOverview;

