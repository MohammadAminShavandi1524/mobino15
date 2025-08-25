"use client";

interface FlagbearerMobilesOverviewProps {}

import {
  ProductOverview,
  Content,
  CustomLink,
  ExtraContent,
  MainTitle,
  Paragraph,
} from "../ProductOverview";

const FlagbearerMobilesOverview = ({}: FlagbearerMobilesOverviewProps) => {
  return (
    <ProductOverview className="mt-8">
      <Content>
        <MainTitle label="محصولات پرچمدار موبینو" />

        <Paragraph>
          در فروشگاه اینترنتی <strong>موبینو</strong> می‌توانید جدیدترین و
          پیشرفته‌ترین گوشی‌های پرچمدار را از برندهای معتبر جهانی پیدا کنید.
          محصولات پرچمدار موبینو با بهترین سخت‌افزار، دوربین‌های فوق‌العاده و
          طراحی مدرن عرضه می‌شوند تا تجربه‌ای بی‌نظیر از خرید و استفاده موبایل
          برای شما فراهم کنند.
        </Paragraph>

        <MainTitle label="گوشی‌های پرچمدار سامسونگ" />
        <Paragraph>
          سری گلکسی سامسونگ، با طراحی شیک، نمایشگر با کیفیت و دوربین حرفه‌ای،
          جزو محبوب‌ترین گوشی‌های پرچمدار است. شما می‌توانید انواع گوشی‌های
          پرچمدار سامسونگ را در موبینو مشاهده کرده و با
          <CustomLink
            href="/mobile/samsungPhone"
            label="خرید گوشی سامسونگ پرچمدار"
          />
          تجربه‌ای متفاوت داشته باشید.
        </Paragraph>

        <MainTitle label="گوشی‌های پرچمدار اپل" />
        <Paragraph>
          آیفون‌های پرچمدار اپل با پردازنده‌های قدرتمند، دوربین‌های پیشرفته و
          سیستم عامل به‌روز، همیشه در صدر علاقه‌مندی کاربران قرار دارند. شما
          می‌توانید جدیدترین مدل‌های آیفون را در موبینو بررسی کرده و با بهترین
          قیمت از
          <CustomLink href="/mobile/iPhone" label="خرید آیفون پرچمدار" /> لذت
          ببرید.
        </Paragraph>
      </Content>

      <ExtraContent>
        <MainTitle label="گوشی‌های پرچمدار شیائومی" />
        <Paragraph>
          شیائومی با ارائه سری‌های پرچمدار خود، محصولاتی با سخت‌افزار قدرتمند،
          نمایشگر عالی و دوربین‌های حرفه‌ای عرضه کرده است. علاقه‌مندان به
          گوشی‌های پرچمدار می‌توانند با مراجعه به
          <CustomLink
            href="/mobile/XiaomiPhone"
            label="صفحه گوشی‌های پرچمدار شیائومی"
          />
          بهترین انتخاب را داشته باشند.
        </Paragraph>

        <MainTitle label="چرا محصولات پرچمدار موبینو؟" />
        <Paragraph>
          خرید محصولات پرچمدار از موبینو به شما این امکان را می‌دهد که از:
          <ul className="list-inside list-disc">
            <li>قیمت‌های رقابتی و تخفیف‌های ویژه</li>
            <li>گارانتی و ضمانت اصالت کالا</li>
            <li>مشاوره و پشتیبانی قبل و بعد از خرید</li>
          </ul>
          بهره‌مند شوید. موبینو با تمرکز بر کیفیت و خدمات، خرید گوشی‌های پرچمدار
          را برای شما آسان و مطمئن کرده است.
        </Paragraph>

        <MainTitle label="همکاری با موبینو (فروشنده شو)" />
        <Paragraph>
          فروشندگان علاقه‌مند می‌توانند با موبینو همکاری کنند و محصولات پرچمدار
          خود را با بهترین شرایط به مشتریان عرضه کنند. برای ثبت نام وارد صفحه
          <CustomLink href="/auth/seller" label="فروشنده شو" /> شوید و مراحل لازم را طی
          کنید.
        </Paragraph>
      </ExtraContent>
    </ProductOverview>
  );
};

export default FlagbearerMobilesOverview;
