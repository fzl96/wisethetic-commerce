import { MaxWidthWrapper } from "@/components/max-width-wrapper";

export default function StorePage() {
  return (
    <MaxWidthWrapper className="mt-28 flex flex-col items-center justify-center px-5 pb-12  text-center sm:mt-32">
      <h1 className="font mt-5 grid max-w-4xl gap-3 font-accent text-5xl leading-none md:text-6xl lg:text-[5rem]">
        <span>
          Crafting <span className="text-primary-accent">Ideas </span>
        </span>
        <span>
          With <span>Intentions</span>
        </span>
      </h1>
      <p className="mt-7 max-w-xl text-2xl font-light">
        Your dedicated creative partner in shaping an exceptional online
        presence.
      </p>

      {/* <Suspense */}
      {/*   fallback={ */}
      {/*     <div className="mt-40 w-full"> */}
      {/*       <CategoryCardsLoader /> */}
      {/*     </div> */}
      {/*   } */}
      {/* > */}
      {/*   <CategorySection /> */}
      {/* </Suspense> */}
    </MaxWidthWrapper>
  );
}
