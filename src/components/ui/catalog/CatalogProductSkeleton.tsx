const CatalogProductSkeleton = () => {
  return (
    <article className="flex h-full animate-pulse flex-col overflow-hidden rounded-[28px] bg-[#f3f0ea]">
      <div className="aspect-[4/3] w-full bg-neutral-200" />

      {/* Размеры блоков повторяют CatalogProductCard, чтобы при загрузке
          сетка не дёргалась */}
      <div className="flex flex-1 flex-col p-5">
        <div className="mb-2 h-4 w-1/3 rounded bg-neutral-200" />
        <div className="mb-3 h-5 w-4/5 rounded bg-neutral-200" />
        <div className="mb-3 h-4 w-1/2 rounded bg-neutral-200" />
        <div className="mb-4 h-4 w-2/3 rounded bg-neutral-200" />

        <div className="mt-auto mb-4 h-6 w-1/3 rounded bg-neutral-200" />

        <div className="h-10 w-full rounded-2xl bg-neutral-200" />
      </div>
    </article>
  )
}

export default CatalogProductSkeleton
