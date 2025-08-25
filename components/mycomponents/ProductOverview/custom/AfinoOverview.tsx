"use client";

import {
  ProductOverview,
  Content,
  CustomLink,
  ExtraContent,
  MainTitle,
  Paragraph,
} from "../ProductOverview";

interface AfinoOverviewProps {}

const AfinoOverview = ({}: AfinoOverviewProps) => {
  return (
    <ProductOverview className="mt-8">
      <Content>
        <MainTitle label="محصولات تخفیف خورده موبینو" />

        <Paragraph>
          در فروشگاه اینترنتی <strong>موبینو</strong> می‌توانید از جدیدترین و
          بهترین تخفیف‌ها روی انواع محصولات دیجیتال بهره‌مند شوید. موبینو با
          ارائه تخفیف‌های ویژه برای گوشی موبایل، تبلت، ساعت هوشمند و لوازم
          جانبی، امکان خرید با صرفه را برای شما فراهم کرده است. تمامی محصولات
          تخفیف خورده، با تضمین اصالت و قیمت مناسب عرضه می‌شوند.
        </Paragraph>

        <MainTitle label="تخفیف روی گوشی‌ها" />
        <Paragraph>
          شما می‌توانید انواع گوشی موبایل از برندهای معتبر را با تخفیف ویژه در
          موبینو پیدا کنید. از جمله:
          <CustomLink href="/mobile/XiaomiPhone" label="گوشی شیائومی" /> ،
          <CustomLink href="/mobile/samsungPhone" label="گوشی سامسونگ" /> و
          <CustomLink href="/mobile/iPhone" label="گوشی آیفون" />.
        </Paragraph>
      </Content>

      <ExtraContent>
        <MainTitle label="تخفیف روی ساعت هوشمند" />
        <Paragraph>
          اسمارت واچ‌ها همیشه مورد توجه کاربران هستند و موبینو برای شما
          تخفیف‌های ویژه‌ای روی ساعت‌های هوشمند برندهای مختلف مثل
          <CustomLink href="/SmartWatch/AppleWatch" label="اپل واچ" /> ، سامسونگ
          و شیائومی فراهم کرده است.
        </Paragraph>

        <MainTitle label="همکاری با موبینو (فروشنده شو)" />
        <Paragraph>
          علاقه‌مندان به فروش محصولات دیجیتال می‌توانند با موبینو همکاری کرده و
          محصولات خود را با تخفیف ویژه به مشتریان ارائه دهند. برای شروع همکاری،
          وارد صفحه
          <CustomLink href="/auth/seller" label="فروشنده شو" /> شوید و مراحل
          ثبت‌نام را طی کنید. مزایای همکاری شامل کمیسیون منصفانه، بازپرداخت سریع
          و امکان استفاده از تبلیغات ویژه برای محصولات تخفیف خورده است.
        </Paragraph>
      </ExtraContent>
    </ProductOverview>
  );
};

export default AfinoOverview;
