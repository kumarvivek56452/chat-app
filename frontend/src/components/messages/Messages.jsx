import { useEffect, useRef } from "react";
import useGetMessages from "../../hooks/useGetMessage";
import MessageSkeleton from "../skeletons/messageSkeleton";
import Message from "./Message";
import useListenMessages from "../../hooks/useListenMessage";

const Messages = () => {
    const { messages, loading } = useGetMessages();
    useListenMessages();
    const lastMessageRef = useRef();

    useEffect(() => {
        setTimeout(() => {
            if (lastMessageRef.current) {
                lastMessageRef.current.scrollIntoView({ behavior: "smooth" });
            }
        }, 100);
    }, [messages, loading]);

    return (
        <div className="px-4 flex-1 overflow-auto">
            {loading && [...Array(4)].map((_, idx) => <MessageSkeleton key={idx} />)}

            {!loading && messages.length > 0 && messages.map((message, index) => (
                <div key={message._id} ref={index === messages.length - 1 ? lastMessageRef : null}>
                    <Message message={message} />
                </div>
            ))}

            {!loading && messages.length === 0 && (
                <p className="text-center">Send a message to start the conversation</p>
            )}
        </div>
    );
}

export default Messages