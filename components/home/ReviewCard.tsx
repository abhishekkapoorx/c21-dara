import {Card, CardHeader, CardBody, CardFooter, Divider, Link, Image} from "@heroui/react";
import { IconStar, IconStarFilled, IconStarHalf, IconStarHalfFilled } from "@tabler/icons-react";

export type GoogleReview = {
  reviewId: string | null;
  reviewer: {
      profilePhotoUrl: string;
      displayName: string;
      isAnonymous: boolean;
  };
  starRating: number;
  comment: string;
  createTime: string | null;
  updateTime: string | null;
  reviewReply?: {
      comment: string;
      updateTime: string;
  } | null;
};

export default function ReviewCard({review}: {review: GoogleReview}) {
  const starRating = review.starRating;
  const starFilled = Math.floor(starRating);
  const starHalf = starRating % 1 !== 0 ? 1 : 0;
  const starEmpty = 5 - starFilled - starHalf;
  return (
    <Card className="max-w-[400px] h-full">
      <CardHeader className="flex gap-3">
        <Image
          alt="Review Profile Photo"
          height={40}
          radius="sm"
          src={review.reviewer.profilePhotoUrl}
          width={40}
          className="rounded-full"
          
        />
        {/* <div className="h-10 w-10 rounded-2xl flex items-center justify-center bg-amber-500 text-black">
            L
        </div> */}
        <div className="flex flex-col gap-2">
          <p className="text-lg">{review.reviewer.displayName}</p>
          <div className="text-small text-default-500 flex gap-1">
            {Array.from({length: starFilled}).map((_, index) => (
              <IconStarFilled key={index+"asfda4"} size={16} className="text-amber-500"/>
            ))}
            {Array.from({length: starHalf}).map((_, index) => (
              <IconStarHalfFilled key={index+"asdfea6gra"} size={16} className="text-amber-500"/>
            ))}
            {Array.from({length: starEmpty}).map((_, index) => (
              <IconStar key={index+"54af6d6afa"} size={16} className="text-amber-500"/>
            ))}
            {/* <IconStarFilled size={16} className="text-amber-500"/>

            <IconStarFilled size={16} className="text-amber-500"/>
            <IconStarFilled size={16} className="text-amber-500"/>
            <IconStarFilled size={16} className="text-amber-500"/>
            <IconStarHalfFilled size={16} className="text-amber-500"/>
            <IconStar  size={16} className="text-amber-500"/> */}

          </div>
        </div>
      </CardHeader>
      <Divider />
      <CardBody>
        <p>{review.comment}</p>
      </CardBody>
      <Divider />
      {/* <CardFooter>
        <Link isExternal showAnchorIcon href="https://github.com/heroui-inc/heroui">
           
        </Link>
      </CardFooter> */}
    </Card>
  );
}
