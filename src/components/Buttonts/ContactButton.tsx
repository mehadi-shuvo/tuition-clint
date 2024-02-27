import { whatsAppSVG } from "../../assets/svgs/localSVGs";

const ContactButton = () => {
  const redirectToWhatsApp = () => {
    // Replace the phone number with the desired phone number
    const phoneNumber = "01723263304";
    // Create the WhatsApp URL with the phone number
    const whatsappUrl = `https://wa.me/${phoneNumber}`;
    // Redirect to the WhatsApp URL
    window.location.href = whatsappUrl;
  };
  return (
    <div
      onClick={redirectToWhatsApp}
      className="cursor-pointer flex items-center px-4 py-2 rounded-md bg-green-500 capitalize  text-white font-bold transition duration-200 hover:bg-green-700 border-2 border-transparent hover:shadow-xl"
    >
      {whatsAppSVG}
      whatsApp
    </div>
  );
};

export default ContactButton;
