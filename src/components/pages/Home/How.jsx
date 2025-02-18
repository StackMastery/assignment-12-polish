import TitleAndDes from "@/components/TitleAndDes";
import LineBrack from "@/components/ui/LineBrack";
import { BsInputCursor } from "react-icons/bs";
import { CiWifiOn } from "react-icons/ci";
import { GoPlus } from "react-icons/go";
import { IoMdHeartEmpty } from "react-icons/io";
import { IoInformationSharp } from "react-icons/io5";

const How = () => {
  return (
    <>
      <TitleAndDes title={`How It Works`}>
        At Red.Bank, we simplify blood donation with an easy-to-use platform and
        dedicated support, ensuring a
        <LineBrack /> smooth, convenient process from scheduling to donating,
        making it easier to save lives.
      </TitleAndDes>
      <section className="flex justify-center">
        <div className="w-primary grid px-5 grid-cols-1 sm:grid-cols-2 md:grid-cols-4 xl:grid-cols-5 justify-between gap-5 pb-20 pt-10">
          {StackCardData &&
            StackCardData.map((card, index) => (
              <div
                data-aos="fade-up"
                data-aos-delay={index * 200}
                data-aos-anchor-placement="bottom-bottom"
                key={index}
                className="p-5 bg-white w-full transition-all col-span-1 hover:border-red-400 cursor-pointer border rounded-xl space-y-5"
              >
                <div className="flex gap-3 items-center">
                  <span className="p-2 border text-xl text-red-500 bg-red-50 rounded-md">
                    {card?.icon}
                  </span>
                </div>
                <h2 className="font-2">{card.title}</h2>
                <p className="text-xs">{card?.description}</p>
              </div>
            ))}
        </div>
      </section>
    </>
  );
};

export default How;

const StackCardData = [
  {
    title: "Register with Red.Bank",
    description:
      "Register quickly to access all features, schedule donations, and find donors.",
    icon: <BsInputCursor />,
  },
  {
    title: "Create a Blood Donation Request or Find a Donor",
    description:
      "Create donation requests or search for donors easily and efficiently.",
    icon: <GoPlus />,
  },
  {
    title: "Contact the Donor or Donation Center",
    description:
      "Contact donors or centers through our secure communication system.",
    icon: <CiWifiOn />,
  },
  {
    title: "Donate & Save Lives",
    description:
      "Visit a donation center or meet your donor to save lives comfortably.",
    icon: <IoMdHeartEmpty />,
  },
  {
    title: "Stay Informed",
    description:
      "Track your donation impact and stay motivated to continue saving lives.",
    icon: <IoInformationSharp />,
  },
];
