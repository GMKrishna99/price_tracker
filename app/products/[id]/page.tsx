import { getProductById } from "@/lib/actions"
import Image from "next/image"
import Link from "next/link"
import { redirect } from "next/navigation"
import HeartSVG from '@/public/assets/icons/red-heart.svg'
import BookmarkSVG from '@/public/assets/icons/bookmark.svg'
import ShareSVG from '@/public/assets/icons/share.svg'
import StarsSVG from '@/public/assets/icons/star.svg'
import CommentSVG from '@/public/assets/icons/comment.svg'
import { Product } from "@/types"
import { formatNumber } from "@/lib/utils"

type Props = {
    params: { id: string }
}

const ProductDetails = async ({ params: { id } }: Props) => {
    const product: Product = await getProductById(id);
    if (!product) redirect('/')
    return (
        <div className="product-container">
            <div className="flex gap-28 xl:flex-row flex-col">
                <div className="product-image">
                    <Image
                        src={product.image}
                        alt={product.title}
                        width={580}
                        height={400}
                        className="mx-auto"
                    />
                </div>
                <div className="flex-1 flex flex-col">
                    <div className="flex justify-between items-start gap-5 flex-wrap pb-6">
                        <div className="flex flex-col gap-3">
                            <p className="text-[28px] text-secondary font-semibold">{product.title}</p>
                            <Link href={product.url} target="_blank" className="text-base text-black opacity-50">
                                Visit Product
                            </Link>
                        </div>

                        <div className="flex items-center gap-3">
                            <div className="product-hearts">
                                <Image
                                    src={HeartSVG}
                                    alt="heart"
                                    width={20}
                                    height={20}
                                />
                                <p className="text-base font-semibold text-[#D46f77]">{product.reviewsCount}</p>
                            </div>
                            <div className="p-2 bg-white-200 rounded-10">
                                <Image
                                    src={BookmarkSVG}
                                    alt="bookmark"
                                    width={20}
                                    height={20}
                                />
                            </div>
                            <div className="p-2 bg-white-200 rounded-10">
                                <Image
                                    src={ShareSVG}
                                    alt="share"
                                    width={20}
                                    height={20}
                                />
                            </div>
                        </div>
                    </div>
                    <div className="product-info">
                        <div className="flex flex-col gap-2">
                            <p className="text-[34px] text-secondary font-bold">{product.currency} {formatNumber(product.currentPrice)}</p>
                            <p className="text-[21px] text-black opacity-50 line-through">{product.currency} {formatNumber(product.originalPrice)}</p>
                        </div>
                        <div className="flex flex-col gap-4">
                            <div className="flex gap-3">
                                <div className="product-stars">
                                    <Image
                                        src={StarsSVG}
                                        alt="stars"
                                        width={16}
                                        height={16}
                                    />
                                    <p className="text-sm text-primary-orange font-semibold">{product.stars} </p>
                                </div>
                                <div className="product-reviews">
                                    <Image
                                        src={CommentSVG}
                                        alt="comment"
                                        width={16}
                                        height={16}
                                    />
                                    <p className="text-sm text-secondary font-semibold">{product.reviewsCount} Reviews</p>
                                </div>
                            </div>
                            <p className="text-sm text-black opacity-50">
                                <span className="text-primary-green font-semibold">93%</span> of buyers have recommended this Product
                            </p>
                        </div>
                    </div>
                    <div className="my-7 flex flex-col gap-5">
                        <div className="flex gap-5 flex-wrap">

                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProductDetails