import React, { useState, useEffect, useRef, useCallback } from 'react';

const SearchDropdown = () => {
    const colors = ['voilet', 'green', 'blue', 'green', 'yellow', 'orange', 'red'];
    const [selectedArray, setSelectedArray] = useState([]);
    const [searchTerm, setSearchTerm] = useState(null);
    const [colorArray, setColorArray] = useState(colors);
	const [dropdownVisible, setDropdownVisible] = useState(false);

    const dropdownInputWrapperRef = useRef(null);
	const dropdownInputRef = useRef(null);
	const dropdownRef = useRef(null);

    const closeDropdown = useCallback(() => {
		setDropdownVisible(false);
	}, [setDropdownVisible]);

    useEffect(() => {
		const handleOutsideClick = (event) => {
			const clickOutsideInput = dropdownInputWrapperRef.current && !dropdownInputWrapperRef.current.contains(event.target);
			const clickOutsideDropdown = dropdownRef.current && !dropdownRef.current.contains(event.target);
			if (clickOutsideInput && clickOutsideDropdown) closeDropdown();
		};

		document.addEventListener('click', handleOutsideClick);

		return () => document.removeEventListener('click', handleOutsideClick);
	}, [dropdownInputWrapperRef, dropdownRef, closeDropdown]);

    const removeSelectedItem = (event) => {
        try {
            event.preventDefault();
            let currentColor = event.currentTarget.parentNode.firstChild.innerHTML;
            let finalArray = selectedArray.filter((item) => currentColor !== item);
    
            setSelectedArray(finalArray);
        } catch (err) {
            console.error(`error while remove selectedItem:: ${err.message}`);
        }
    }

    const renderMultiselectOptions = () => {
        try {
            if(!selectedArray || !selectedArray.length === 0) return null;

            return selectedArray.map((eachArray, index) => {
                return (
                    <li key={index} className="dropdown-select-item">
                        <span className="dropdown-select-item-value">
                            {eachArray}
                        </span>
                        <button onClick={(event) => removeSelectedItem(event)}>x</button>
                    </li>
                );
            });
        } catch (err) {
            console.error(`error while render multiSelectedItem:: ${err.message}`);
        }
	};

    const handleSearch = (event) => {
        try {
            const currentSearchValue = event.target.value;
            setSearchTerm(currentSearchValue);
            let timeOutId;
            
            clearTimeout(timeOutId);
            timeOutId = setTimeout(() => {
                if (searchTerm) {
                    const currentSearchTerm = colorArray.filter((arr) => arr.includes(currentSearchValue) ? arr : null)
                    setColorArray(currentSearchTerm);
                } else setColorArray(colors);
            }, 500);
        } catch (err) {
            console.error(`error while handling search:: ${err.message}`);
        }
    };

    const renderDropdownInput = () => {
        try {
            const handleClick = () => {
                setDropdownVisible(true);
            };
    
            const handleFocus = () => {
                setDropdownVisible(true);
            }
     
            return (
                <ul className="dropdown-input" ref={dropdownInputWrapperRef}>
                    {renderMultiselectOptions()}
                    <div className="dropdown-input-wrapper">
                        <input
                            placeholder='Enter the color...'
                            value={searchTerm}
                            ref={dropdownInputRef}
                            type="text"
                            onChange={(event) => handleSearch(event)}
                            onClick={handleClick}
                            onFocus={handleFocus}
                        />
                    </div>
                </ul>
            );
        } catch (err) {
            console.error(`error while rendering dropdown input:: ${err.message}`);
        }
	};

    const renderClearButton = () => {
        try {
            if(!selectedArray || !selectedArray.length) return null;

            const handleClear = (event) => {
                event.stopPropagation();
                if (selectedArray && selectedArray.length > 0) setSelectedArray(null);
                dropdownInputRef.current?.focus();
                setColorArray(colors);
            };
            return (<button className="btn-clear" onClick={(event) => handleClear(event)}>x</button>);
        } catch (err) {
            console.error(`error while rendering clear button:: ${err.message}`);
        }
	};

    const renderDropdownIcon = () => {
		return (
			<button className="dropdown-icon">></button>
		);
	};

    const handleAddition = (event) => {
        try {
            event.stopPropagation();
            const currentItem = event.currentTarget.firstChild.innerHTML;
    
            if(!selectedArray.includes(currentItem)) {
                setSelectedArray([...selectedArray, currentItem]);
            } else alert('The color has already added');
            
            setSearchTerm('');
            dropdownInputRef.current?.focus();
            setColorArray(colors);
        } catch (err) {
            console.error(`error while adding color:: ${err.message}`);
        }
    }

    return (
        <div className="dropdown-container">
            <div className='dropdown-wrapper'>
                {renderDropdownInput()}
                <div className='dropdown-action'>
                    {renderClearButton()}
                    {renderDropdownIcon()}
                </div>
            </div>
            {
                dropdownVisible ? (
                    <ul ref={dropdownRef} className="dropdown-menu">
                        {
                            colorArray.map((eachColor, index) => {
                                return (
                                    <li className="dropdown-list" key={index} onClick={(event) => handleAddition(event)}>
                                        <span>{eachColor}</span>
                                    </li>
                                )
                            })
                        }
                    </ul>
                ) : null
            }
        </div>
    );
}

export default SearchDropdown