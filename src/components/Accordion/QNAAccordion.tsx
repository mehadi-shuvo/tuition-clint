import { useState } from "react";
import {
  Accordion,
  AccordionItem,
  AccordionItemHeading,
  AccordionItemButton,
  AccordionItemPanel,
} from "react-accessible-accordion";

import "react-accessible-accordion/dist/fancy-example.css";
import { chevronDown, chevronUp } from "../../assets/svgs/localSVGs";
import Aos from "aos";

const QNAAccordion = () => {
  Aos.init();
  const [isOpen, setIsOpen] = useState(false);
  const toggleAccordion = () => {
    setIsOpen(!isOpen);
    console.log(isOpen);
  };
  return (
    <Accordion allowZeroExpanded>
      <AccordionItem
        data-aos="zoom-in"
        data-aos-duration="1000"
        onClick={toggleAccordion}
        className="bg-slate-950 mb-3 rounded-xl"
      >
        <AccordionItemHeading>
          <AccordionItemButton className="bg-slate-300 text-slate-900 text-xl rounded-xl py-4 px-5 flex justify-between items-center">
            <span> What harsh truths do you prefer to ignore?</span>
            <span>{isOpen ? chevronUp : chevronDown}</span>
          </AccordionItemButton>
        </AccordionItemHeading>
        <AccordionItemPanel>
          <p>
            Exercitation in fugiat est ut ad ea cupidatat ut in cupidatat
            occaecat ut occaecat consequat est minim minim esse tempor laborum
            consequat esse adipisicing eu reprehenderit enim.
          </p>
        </AccordionItemPanel>
      </AccordionItem>
      <AccordionItem
        data-aos="zoom-in"
        data-aos-duration="1000"
        onClick={toggleAccordion}
        className="bg-slate-950 mb-3 rounded-xl"
      >
        <AccordionItemHeading>
          <AccordionItemButton className="bg-slate-300 text-slate-900 text-xl rounded-xl py-4 px-5 flex justify-between items-center">
            <span> What harsh truths do you prefer to ignore?</span>
            <span>{isOpen ? chevronUp : chevronDown}</span>
          </AccordionItemButton>
        </AccordionItemHeading>
        <AccordionItemPanel>
          <p>
            Exercitation in fugiat est ut ad ea cupidatat ut in cupidatat
            occaecat ut occaecat consequat est minim minim esse tempor laborum
            consequat esse adipisicing eu reprehenderit enim.
          </p>
        </AccordionItemPanel>
      </AccordionItem>
      <AccordionItem
        data-aos="zoom-in"
        data-aos-duration="1000"
        onClick={toggleAccordion}
        className="bg-slate-950 mb-3 rounded-xl"
      >
        <AccordionItemHeading>
          <AccordionItemButton className="bg-slate-300 text-slate-900 text-xl rounded-xl py-4 px-5 flex justify-between items-center">
            <span> What harsh truths do you prefer to ignore?</span>
            <span>{isOpen ? chevronUp : chevronDown}</span>
          </AccordionItemButton>
        </AccordionItemHeading>
        <AccordionItemPanel>
          <p>
            Exercitation in fugiat est ut ad ea cupidatat ut in cupidatat
            occaecat ut occaecat consequat est minim minim esse tempor laborum
            consequat esse adipisicing eu reprehenderit enim.
          </p>
        </AccordionItemPanel>
      </AccordionItem>
      <AccordionItem
        data-aos="zoom-in"
        data-aos-duration="1000"
        onClick={toggleAccordion}
        className="bg-slate-950 mb-3 rounded-xl"
      >
        <AccordionItemHeading>
          <AccordionItemButton className="bg-slate-300 text-slate-900 text-xl rounded-xl py-4 px-5 flex justify-between items-center">
            <span> What harsh truths do you prefer to ignore?</span>
            <span>{isOpen ? chevronUp : chevronDown}</span>
          </AccordionItemButton>
        </AccordionItemHeading>
        <AccordionItemPanel>
          <p>
            Exercitation in fugiat est ut ad ea cupidatat ut in cupidatat
            occaecat ut occaecat consequat est minim minim esse tempor laborum
            consequat esse adipisicing eu reprehenderit enim.
          </p>
        </AccordionItemPanel>
      </AccordionItem>
    </Accordion>
  );
};

export default QNAAccordion;
