import {
    addToast,
    Button,
    Input,
    Modal,
    ModalBody,
    ModalContent,
    ModalFooter,
    ModalHeader,
} from "@heroui/react";
import { useState } from "react";
import { db } from "../firebase";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";

interface BookDownloadModalProps {
    isOpen: boolean;
    onOpen: () => void;
    onOpenChange: (isOpen: boolean) => void;
    bookHref: string;
}

const ModalComp = ({ isOpen, onOpen, onOpenChange, bookHref }: BookDownloadModalProps) => {
    const [Email, setEmail] = useState("")
    const [name, setName] = useState("")
    const [submitting, setSubmitting] = useState(false)
    
    const handleDownload = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            setSubmitting(true);
            
            // Add email to Firestore
            await addDoc(collection(db, "ebookDownloads"), {
                name: name,
                email: Email,
                bookUrl: bookHref,
                downloadedAt: serverTimestamp(),
            });
            
            // Open the download
            window.open(bookHref, "_blank");
            
            addToast({
                title: "Download started",
                description: "Your download will start shortly.",
                color: "success"
            });
            
            setSubmitting(false);
            onOpenChange(false);
        } catch (error) {
            console.error("Error saving download data:", error);
            addToast({
                title: "Download error",
                description: "There was an issue with your download.",
                color: "danger"
            });
            setSubmitting(false);
        }
    }

    return (
        <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
            <ModalContent>
                {(onClose) => (
                    <form onSubmit={handleDownload}>
                        <ModalHeader className="flex flex-col gap-1">Download Ebook</ModalHeader>
                        <ModalBody>
                            <Input
                                type="name"
                                placeholder="Enter your name"
                                label="Name"
                                className="w-full mb-4"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                required
                                isRequired
                            />
                            <Input
                                type="email"
                                placeholder="Enter your email"
                                label="Email Address"
                                className="w-full mb-4"
                                value={Email}
                                onChange={(e) => setEmail(e.target.value)}
                                startContent={
                                    <span className="">@</span>
                                }
                                required
                                isRequired
                            />
                            <p className="text-sm">Enjoy downloading ebook free! By just submitting your email.</p>
                        </ModalBody>
                        <ModalFooter>
                            <Button color="warning" variant="flat" onPress={onClose}>
                                Close
                            </Button>
                            <Button color="warning" type="submit" isLoading={submitting}>
                                Download
                            </Button>
                        </ModalFooter>
                    </form>
                )}
            </ModalContent>
        </Modal>
    )
}

export default ModalComp