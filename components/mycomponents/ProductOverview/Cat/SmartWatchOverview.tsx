import {
  ProductOverview,
  Content,
  CustomLink,
  ExtraContent,
  MainTitle,
  Paragraph,
  Title,
} from "../ProductOverview";

const SmartWatchOverview = () => {
  return (
    <ProductOverview>
      {/* توضیحات اصلی */}
      <Content>
        <MainTitle label="خرید ساعت هوشمند از موبینو" />
        <Paragraph>
          ساعت‌های هوشمند ترکیبی از زیبایی و تکنولوژی هستند که علاوه بر نمایش
          زمان، امکاناتی مثل پایش سلامت، اعلان‌ها، برقراری تماس و حتی کنترل
          موسیقی را در اختیار شما قرار می‌دهند. در{" "}
          <CustomLink href="/" label="فروشگاه موبینو" /> می‌توانید انواع
          اسمارت‌واچ‌ها از برندهای معتبر دنیا را پیدا کنید.
        </Paragraph>

        <Title label="برندهای محبوب ساعت هوشمند" />
        <Paragraph>
          موبینو مجموعه‌ای از بهترین برندهای ساعت هوشمند را ارائه می‌دهد؛ از
          جمله{" "}
          <CustomLink
            href="/SmartWatch/XiaomiSmartWatch"
            label="شیائومی (Xiaomi)"
          />
          ،{" "}
          <CustomLink
            href="/SmartWatch/SamsungSmartwatch"
            label="سامسونگ (Samsung)"
          />
          و <CustomLink href="/SmartWatch/AppleWatch" label="اپل (Apple)" />.
        </Paragraph>
      </Content>

      {/* توضیحات بیشتر */}
      <ExtraContent>
        <Title label="ساعت هوشمند شیائومی" />
        <Paragraph>
          <CustomLink href="/SmartWatch/XiaomiSmartWatch" label="شیائومی" /> با
          قیمت اقتصادی و امکانات کاربردی مثل پایش ضربان قلب، GPS و باتری
          قدرتمند، انتخابی مناسب برای کسانی است که به دنبال ساعت هوشمند مقرون به
          صرفه هستند.
        </Paragraph>

        <Title label="ساعت هوشمند سامسونگ" />
        <Paragraph>
          <CustomLink href="/SmartWatch/SamsungSmartwatch" label="سامسونگ" />{" "}
          یکی از برندهای پیشرو در حوزه اسمارت‌واچ است. مدل‌های مختلف این برند با
          نمایشگرهای باکیفیت AMOLED و قابلیت‌های گسترده سلامت‌محور، بین کاربران
          حرفه‌ای محبوبیت زیادی دارند.
        </Paragraph>

        <Title label="ساعت هوشمند اپل" />
        <Paragraph>
          <CustomLink href="/SmartWatch/AppleWatch" label="اپل واچ" /> بهترین
          انتخاب برای کاربران آیفون است. طراحی شیک، هماهنگی کامل با اکوسیستم اپل
          و امکانات پیشرفته سلامتی و ورزشی، این ساعت‌ها را به یکی از پرفروش‌ترین
          محصولات دنیا تبدیل کرده است.
        </Paragraph>

        <Title label="راهنمای خرید ساعت هوشمند" />
        <Paragraph>
          هنگام خرید ساعت هوشمند باید به عواملی مانند سازگاری با گوشی موبایل،
          امکانات پایش سلامتی، ظرفیت باتری، کیفیت صفحه نمایش، پشتیبانی از تماس و
          همچنین طراحی و راحتی در استفاده روزانه توجه کنید.
        </Paragraph>
      </ExtraContent>
    </ProductOverview>
  );
};

export default SmartWatchOverview;
