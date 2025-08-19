import {
  ProductOverview,
  Content,
  ExtraContent,
  MainTitle,
  Title,
  Paragraph,
} from "../ProductOverview";

const SamsungSmartwatchOverview = () => {
  return (
    <ProductOverview>
      <Content>
        <MainTitle label="ساعت هوشمند سامسونگ" />
        <Paragraph>
          ساعت‌های هوشمند سامسونگ با ترکیبی از طراحی شیک، امکانات پیشرفته و دوام
          باتری مناسب، گزینه‌ای محبوب برای کاربران حرفه‌ای و علاقه‌مندان به
          تکنولوژی هستند. این ساعت‌ها تجربه‌ای کامل و یکپارچه با گوشی‌های
          سامسونگ ارائه می‌دهند.
        </Paragraph>
      </Content>

      <ExtraContent>
        <Title label="مدل‌ها و ویژگی‌ها" />
        <Paragraph>
          سامسونگ مدل‌های متنوعی از جمله Galaxy Watch و Galaxy Watch Active
          ارائه می‌دهد. این ساعت‌ها دارای سنسورهای سلامت، پایش فعالیت‌های ورزشی،
          GPS داخلی و قابلیت اتصال به گوشی هوشمند برای اعلان‌ها و کنترل موسیقی
          هستند.
        </Paragraph>

        <Title label="باتری و دوام" />
        <Paragraph>
          ساعت‌های سامسونگ با باتری با ظرفیت مناسب، امکان استفاده چند روزه بدون
          نیاز به شارژ مکرر را فراهم می‌کنند. برخی مدل‌ها قابلیت شارژ سریع نیز
          دارند.
        </Paragraph>

        <Title label="تعادل بین قیمت و امکانات" />
        <Paragraph>
          سامسونگ با ارائه محصولاتی با امکانات پیشرفته و قیمت متنوع، انتخاب
          مناسبی برای کاربران با نیازهای مختلف ایجاد کرده است. این ساعت‌ها ارزش
          خرید بالایی دارند.
        </Paragraph>

        <Title label="طراحی و راحتی استفاده" />
        <Paragraph>
          طراحی شیک و ارگونومیک ساعت‌های سامسونگ، استفاده طولانی مدت را راحت
          می‌کند. صفحه نمایش با کیفیت، رابط کاربری روان و بندهای متنوع، تجربه
          کاربری لذت‌بخش را تضمین می‌کند.
        </Paragraph>
      </ExtraContent>
    </ProductOverview>
  );
};

export default SamsungSmartwatchOverview;
