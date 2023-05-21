import React, {
  useState,
  useEffect,
  FunctionComponent,
  useRef,
  SetStateAction,
  Dispatch,
} from "react";
import "../Main/css/primary/primarySelectStyles.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDown as arrowDown } from "@fortawesome/free-solid-svg-icons";
import { faAngleUp as arrowUp } from "@fortawesome/free-solid-svg-icons";

type ReusableSelectProps = {
  dropdownOptions: string[];
  setValue: Dispatch<SetStateAction<string>>;
  placeholderOptions: string;
  placeholderSelect: string;
};

export const ReusableSelect: FunctionComponent<ReusableSelectProps> = ({
  dropdownOptions,
  setValue,
  placeholderOptions,
  placeholderSelect,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState(placeholderOptions);

  const selectRef = useRef<any>(null);
  const ulRef = useRef<any>(null);

  useEffect(() => {
    const closeDropdown = (e: any) => {
      if (
        isOpen === false &&
        selectRef.current.contains(e.target) &&
        !ulRef.current.contains(e.target)
      ) {
        setIsOpen(true);
        setSelected(placeholderSelect);
      } else if (
        isOpen === true &&
        !selectRef.current.contains(e.target) &&
        !ulRef.current.contains(e.target)
      ) {
        setIsOpen(false);
        setSelected(placeholderOptions);
      } else if (isOpen === true && selectRef.current.contains(e.target)) {
        setIsOpen(false);
        setSelected(placeholderOptions);
      }
    };

    document.body.addEventListener("click", closeDropdown);
    return () => document.body.removeEventListener("click", closeDropdown);
  }, [isOpen, placeholderOptions, placeholderSelect]);

  let classNameSelectOption: string[] = [];
  let classNameSelectBtn: string[] = [];

  if (selected === placeholderSelect || selected === placeholderOptions) {
    classNameSelectOption.push("empty");
    classNameSelectBtn.push("");
  } else {
    classNameSelectOption.push("fill");
    classNameSelectBtn.push("selected");
  }
  return (
    <>
      <div ref={selectRef} className={`selectOption ${classNameSelectOption}`}>
        <div className={`selectButton ${classNameSelectBtn}`}>
          {selected}
          {isOpen ? (
            <p className="arrow up">
              <FontAwesomeIcon icon={arrowUp} />
            </p>
          ) : (
            <p className="arrow">
              <FontAwesomeIcon icon={arrowDown} />
            </p>
          )}
        </div>
        <div
          ref={ulRef}
          className={
            isOpen ? "selectOptionUl visible" : "selectOptionUl hidden"
          }
        >
          {dropdownOptions.map((categoryElement, index) => {
            return (
              <div
                className="optionsLi"
                key={index}
                onClick={() => {
                  setSelected(
                    categoryElement.charAt(0).toUpperCase() +
                      categoryElement.slice(1)
                  );
                  setValue(
                    categoryElement.charAt(0).toUpperCase() +
                      categoryElement.slice(1)
                  );
                  setIsOpen(false);
                }}
              >
                <p className="optionSelected">
                  {categoryElement.charAt(0).toUpperCase() +
                    categoryElement.slice(1)}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};
