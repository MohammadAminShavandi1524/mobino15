import {
  ProductOverview,
  Content,
  ExtraContent,
  MainTitle,
  Title,
  Paragraph,
} from "../ProductOverview";

const SamsungTabletOverview = () => {
  return (
    <ProductOverview>
      <Content>
        <MainTitle label="تبلت سامسونگ" />
        <Paragraph>
          تبلت‌های سامسونگ با طراحی زیبا، نمایشگرهای با کیفیت و قابلیت‌های
          پیشرفته، گزینه‌ای محبوب برای کاربران خانگی، دانشجویان و حرفه‌ای‌ها
          هستند. این برند کره‌ای طیف گسترده‌ای از مدل‌ها با امکانات مختلف ارائه
          می‌دهد.
        </Paragraph>
      </Content>

      <ExtraContent>
        <Title label="سری‌ها و مدل‌ها" />
        <Paragraph>
          سامسونگ سری‌های Galaxy Tab و Galaxy Tab S را عرضه می‌کند. هر سری با
          هدف کاربران متفاوت طراحی شده؛ از تبلت‌های سبک و اقتصادی گرفته تا
          مدل‌های حرفه‌ای با نمایشگر و سخت‌افزار پیشرفته.
        </Paragraph>

        <Title label="نوآوری و تکنولوژی" />
        <Paragraph>
          سامسونگ با بهره‌گیری از پردازنده‌های مدرن، صفحه نمایش AMOLED و قلم
          دیجیتال S Pen، تجربه‌ای روان و کاربردی فراهم می‌کند. باتری با دوام و
          قابلیت اتصال متنوع از دیگر مزایای تبلت‌های سامسونگ است.
        </Paragraph>

        <Title label="تعادل بین قیمت و کیفیت" />
        <Paragraph>
          تبلت‌های سامسونگ در محدوده‌های قیمتی متنوع عرضه می‌شوند. کاربران
          می‌توانند با توجه به نیاز و بودجه خود، مدل مناسب با عملکرد مطلوب و
          دوام بالا انتخاب کنند.
        </Paragraph>

        <Title label="طراحی و تجربه کاربری" />
        <Paragraph>
          طراحی شیک و با کیفیت، وزن مناسب و امکانات پیشرفته، تجربه استفاده
          روزمره و حرفه‌ای را راحت و لذت‌بخش می‌کند. سامسونگ تلاش کرده ترکیبی از
          عملکرد و زیبایی ارائه دهد.
        </Paragraph>
      </ExtraContent>
    </ProductOverview>
  );
};

export default SamsungTabletOverview;
