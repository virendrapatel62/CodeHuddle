import { IconCloudAnimation } from "@/components/homepage/cloud-animation";
import { TypewriterEffectSmooth } from "@/components/ui/typewriter-effect";

export default function Home() {
  return (
    <main className="">
      <div className="grid grid-cols-2">
        <div className="flex items-center">
          <div className="relative p-8 rounded-lg shadow-lg text-center">
            <h2 className="text-3xl font-bold text-slate-300 mb-4">
              <TypewriterEffectSmooth
                words={[
                  {
                    text: "Join",
                  },
                  {
                    text: "CodeHuddle",
                    className: "text-blue-500 dark:text-blue-500",
                  },
                  {
                    text: "Today!",
                  },
                ]}
              />
            </h2>

            <h1>Hello Testing the deployment</h1>

            <p className="text-lg text-gray-400 mb-6">
              {`Become a part of our vibrant community of developers. Whether
              you're a beginner or an experienced coder, there's always
              something new to learn and share.`}
            </p>
          </div>
        </div>
        <IconCloudAnimation />
      </div>
    </main>
  );
}
