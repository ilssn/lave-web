import { Metadata } from "next";

import LandHeader from "@/components/common/land-header";
import { serverTranslation } from "@/i18n";

import TaskConfig from "./_components/task-config";
import TaskPreview from "./_components/task-preview";

type Props = {
  params: { locale: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const locale = params.locale;
  const { t } = await serverTranslation(locale);

  return {
    title: t("网页数据提取工具"),
    description: t(""),
  };
}

interface pageProps {
  params: {
    locale: string;
  };
}

const VideoGeneratorPage = async ({ params: { locale } }: pageProps) => {
  const { t } = await serverTranslation(locale);

  return (
    <div className="mx-auto flex w-full max-w-screen-2xl flex-col gap-4 p-4 md:gap-8 md:p-8">
      <section className="flex w-full flex-col items-center justify-center">
        <LandHeader title={t("网页数据提取工具")} />
      </section>

      <section className="relative flex w-full flex-1 flex-col gap-4 overflow-hidden md:flex-row md:gap-8">
        <div className="w-full md:w-[450px]">
          <TaskConfig />
        </div>
        <div className="relative flex-1">
          <TaskPreview />
        </div>
      </section>
    </div>
  );
};

export default VideoGeneratorPage;
