import {Card, CardHeader, CardBody, CardFooter, Divider, Link, Image} from "@heroui/react";
import { IconStar, IconStarFilled, IconStarHalf, IconStarHalfFilled } from "@tabler/icons-react";

export default function ReviewCard() {
  return (
    <Card className="max-w-[400px]">
      <CardHeader className="flex gap-3">
        {/* <Image
          alt="heroui logo"
          height={40}
          radius="sm"
          src="https://avatars.githubusercontent.com/u/86160567?s=200&v=4"
          width={40}
        /> */}
        <div className="h-10 w-10 rounded-2xl flex items-center justify-center bg-yellow-500 text-black">
            L
        </div>
        <div className="flex flex-col gap-2">
          <p className="text-lg">Leena</p>
          <div className="text-small text-default-500 flex gap-1">
            <IconStarFilled size={16} className="text-yellow-500"/>
            <IconStarFilled size={16} className="text-yellow-500"/>
            <IconStarFilled size={16} className="text-yellow-500"/>
            <IconStarHalfFilled size={16} className="text-yellow-500"/>
            <IconStar  size={16} className="text-yellow-500"/>
          </div>
        </div>
      </CardHeader>
      <Divider />
      <CardBody>
        <p>Selling my home felt overwhelming, but [Realtor Name] made it stress-free. They provided expert advice, staged my home beautifully, and got multiple offers within days. I couldn't have asked for a better experience!</p>
      </CardBody>
      <Divider />
      <CardFooter>
        <Link isExternal showAnchorIcon href="https://github.com/heroui-inc/heroui">
            View on Google
        </Link>
      </CardFooter>
    </Card>
  );
}
