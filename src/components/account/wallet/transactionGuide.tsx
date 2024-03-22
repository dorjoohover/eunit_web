import DialogBox from "@/components/global/dialog";
import { AddIcon } from "@/components/global/icons";
import {
  Link,
  List,
  ListIcon,
  ListItem,
  useDisclosure,
} from "@chakra-ui/react";
import { BiMessageSquareError } from "react-icons/bi";
import { MdCheckCircle } from "react-icons/md";

const TransactionGuide = () => {
  // const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <div>
      <div>
        <DialogBox
          onClick={() => {}}
          dlHeader="Хэтэвч цэнэглэх заавар"
          btnDialog={
            <div
              onClick={() => {}}
              className="flex items-center gap-2 px-2 py-1 duration-300 border border-white rounded-md hover:bg-white/20"
            >
              <AddIcon className="text-2xl" />
              {/* <p>Цэнэглэх</p> */}
            </div>
          }
          dlBody={
            <div className="flex flex-col gap-5">
              <div className="font-semibold ">
                <p className="mb-1">
                  Данс эзэмшигчийн нэр: Би Өү Эм Менежмент ХХК
                </p>
                <p>Дансны дугаар: 460078541 TDB</p>
              </div>
              <List spacing={3}>
                <ListItem>
                  <ListIcon as={MdCheckCircle} color="green.500" />
                  Дээрх данс руу цэнэглэх дүнг оруулах
                </ListItem>
                <ListItem>
                  <ListIcon as={MdCheckCircle} color="green.500" />
                  Гүйлгээний утга дээр бүртгэлтэй Мэйл хаягаа бичих
                </ListItem>
                <ListItem>
                  <ListIcon as={MdCheckCircle} color="green.500" />
                  Гүйлгээ хийсний дараа&nbsp;
                  <Link
                    href="https://www.facebook.com/BOMMLLC/"
                    target="_blanked"
                    className="font-bold underline text-mainBlossom"
                  >
                    Eunit FB
                  </Link>
                  &nbsp;пэйж хуудас руу гүйлгээ хийсэн зургаа баталгаажуулан
                  илгээх
                </ListItem>
                <ListItem>
                  <ListIcon as={BiMessageSquareError} color="green.500" />
                  Гүйлгээг шалгаж үзэн таны Eunit хэтэвчийг цэнэглэх болноо
                </ListItem>
                {/* You can also use custom icons from react-icons */}
              </List>
            </div>
          }
        />
      </div>
    </div>
  );
};

export default TransactionGuide;
