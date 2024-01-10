import { useRef } from "react";
import { getDatabase, ref, push } from "firebase/database";

export default function MessageInput({ userName, chatRoomId }) {
  const message = useRef();

  //* Send Messages to server with userName and message body.
  function sendMessage() {
    const date = new Date();
    const db = getDatabase();

    //*Check the values are valid
    if (userName && message.current.value.length > 1) {
      push(ref(db, "chatrooms/" + chatRoomId), {
        user: userName,
        message: message.current.value,
        date: `${
          date.getHours() < 10 ? "0" + date.getHours() : date.getHours()
        }:${
          date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes()
        }`,
      });
      message.current.value = "";
    }
  }
  return (
    <div className="border-t-2 border-gray-200 px-4 pt-4 mb-2 sm:mb-0">
      <div className="relative flex">
        <span className="absolute inset-y-0 flex items-center"></span>
        <input
          onKeyDown={(e) => e.key == "Enter" && sendMessage()}
          ref={message}
          type="text"
          placeholder="Mesaj yaz..."
          className="w-full focus:outline-none focus:placeholder-gray-400 text-gray-600 placeholder-gray-600 pl-6 bg-gray-200 rounded-md py-3"
        />
        <div className="absolute right-0 items-center inset-y-0 hidden sm:flex">
          <button
            onClick={sendMessage}
            type="button"
            className="inline-flex items-center justify-center rounded-lg px-4 py-3 transition duration-500 ease-in-out text-white bg-blue-500 hover:bg-blue-400 focus:outline-none"
          >
            <span className="font-bold">Gönder</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              className="h-6 w-6 ml-2 transform rotate-90"
            >
              <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z"></path>
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
