"use client";
import { Card, CardHeader, CardBody, CardFooter, Divider, Link, Image } from "@heroui/react";

export default function ListingCard() {
    return (
        <Card className="max-w-[400px] h-full">
            <CardHeader className="flex">
                <div className="flex flex-col rounded-t-2xl">
                    <Image
                        alt="Review Profile Photo"
                        height={250}
                        src={"/images/2.jpg"}
                        width={350}
                        style={{ objectFit: "cover" }}
                        className="rounded-t-2xl bg-cover bg-center"

                    />
                </div>
            </CardHeader>

            <Divider />

            <CardBody>
                <div className="flex flex-col gap-2">
                    <p className="text-lg font-bold">South Dundas</p>
                    <p className="text-sm text-default-500">$350,000</p>
                </div>
            </CardBody>

            <Divider />

            <CardFooter>
                <div className="grid grid-cols-1 gap-3 text-sm text-default-500 w-full">
                    <div className="flex justify-between items-center w-full">
                        <span className="font-bold">Type:</span>
                        <span>Single Family</span>
                    </div>
                    <div className="flex justify-between items-center w-full">
                        <span className="font-bold">Size:</span>
                        <span>2,400 sqft</span>
                    </div>
                    <div className="flex justify-between items-center w-full">
                        <span className="font-bold">Rooms:</span>
                        <span>4 Bed, 3 Bath</span>
                    </div>
                    <div className="flex justify-between items-center w-full">
                        <span className="font-bold">Realtor:</span>
                        <span>EXP Realty</span>
                    </div>
                </div>
            </CardFooter>
        </Card>
    );
}
