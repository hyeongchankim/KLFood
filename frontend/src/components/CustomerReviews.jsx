const customerReviews = [
    {
        id: 1,
        name: "cayl00",
        date: "2026-04-07(화)",
        title: "참반찬 식단",
        content: "결혼하고 하루 두끼를 다 배달시켜먹으니 한달 식비가 200만원 넘게 나오더라구요^^; 이제 배달음식도 먹고싶지않고.. 그맛이 그맛이라.. 고민하다 참반찬를 찾았습니다 계산해보니 일주일에 세번씩 시켜도 식비가 너무 저렴해져서 좋아요 이번에 처음 주문해보았는데 음식도 다 맛있고 배송도 넘 편하고 빠르네요 참반찬 앞으로도 계속 이용하겠습니다.",
        imageUrl: "https://images.unsplash.com/photo-1512058564366-18510be2db19?q=80&w=600&auto=format&fit=crop",
    },
    {
        id: 2,
        name: "ub00",
        date: "2026-03-12(목)",
        title: "참반찬 식단",
        content: "벌써 여러번 주문해서 먹고있어요! 급식처럼 반찬 2,3개 있는 차림을 좋아하는데, 독립하니 이렇게 먹는게 쉽지 않더라구요.. 반찬가게 가서 사는것도 종류가 한정적이라서 질리구.. 그래서 엄청 찾아보다가 참반찬를 알게된 후로 종종 시켜먹고있어요!! 반찬 종류도 다양하고 양도 꽤 많아서 한번 시키면 2,3번 정도 먹을 수 있어용! 워낙 싱겁게 먹는편이라 저한텐 간이 조금 세긴 합니다! 그래서 저염이랑 번갈아가면서 시켜먹구있어요~",
        imageUrl: "https://images.unsplash.com/photo-1590301157890-4810ed35a4d3?q=80&w=600&auto=format&fit=crop",
    },
    {
        id: 3,
        name: "rngm00",
        date: "2026-04-28(화)",
        title: "참반찬 웰빙 식단",
        content: "와우! 반찬집 이것저것 찾다가 골라서 처음 먹어보는데요 완전 맛있어요 ㅠ 엄마가 해주신 반찬 같아요!! 두번 나눠먹기 좋아요! 맛없는거 하나도없이 너무 맛있어요 담에 또 시킬게용 ♥",
        imageUrl: "https://images.unsplash.com/photo-1563379926898-05f4575a45d8?q=80&w=600&auto=format&fit=crop",
    },
    {
        id: 4,
        name: "cjy500",
        date: "2026-05-15(금)",
        title: "참반찬 웰빙 식단",
        content: "일반식 먹다 건강식 시켜봤는데 저염저당 맞나요? 생각보다 너무 맛있어요! 건강식이 일반식보다 맛있다니! 최고에요!",
        imageUrl: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?q=80&w=600&auto=format&fit=crop",
    },
];

const CustomerReviews = () => (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-16">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">
            내돈내산 고객님의 생생한 후기!!
        </h2>
        <div className="overflow-hidden">
            <div className="flex gap-4 w-max review-marquee-track pb-8">
                {[...customerReviews, ...customerReviews].map((review, idx) => (
                    <div key={`${review.id}-${idx}`} className="flex-none w-[280px] sm:w-[300px] bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100">
                        <div className="aspect-[4/3] bg-gray-100 overflow-hidden">
                            <img src={review.imageUrl} alt={review.title} className="w-full h-full object-cover" />
                        </div>
                        <div className="p-5">
                            <p className="text-xs text-gray-400 mb-1">
                                {review.name} 고객님의
                            </p>
                            <p className="text-sm font-bold text-gray-900 mb-3">
                                {review.date} {review.title}
                            </p>
                            <p className="text-sm text-gray-600 leading-relaxed line-clamp-6">
                                {review.content}
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    </section>
);

export default CustomerReviews;
