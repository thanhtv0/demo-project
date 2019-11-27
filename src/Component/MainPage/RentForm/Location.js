import React, {useState, useRef, useEffect} from "react"
import { getPlaces } from "../../../API"

const Location = (props) => {

    const [arrPlace, setPlaces] = useState([]);
    const [searchText, setSearchText] = useState("");
    const [isShowRequired, setShowRequired] = useState(false);
    const [show, setShow] = useState(false);
    const [selectIndex, setSelectIndex] = useState(-1);

    const wraperWhere = useRef(null);

    useEffect(() => {
        if (show) {
            if (searchText === "") {
                searchPlace("Singapore");
            }
            document.addEventListener("mousedown", hanldeClickOut);
            document.addEventListener("keydown", onKeyPress);
            return () => {
                document.removeEventListener("mousedown", hanldeClickOut);
                document.removeEventListener("keydown", onKeyPress);
            }
        }
    }, [show, selectIndex])

    const searchPlace = (searchText) => {
        getPlaces(searchText).then(response => {
            let places = response.data.features.map(element => element.place_name);
            setPlaces(places);
        }).catch(err => {
            console.log(err);
        });
    }

    const handleSeachChange = (e) => {
        let searchText = e.target.value;
        if (searchText === "") {
            if (props.onChange)
                props.onChange("")
        }else {
            searchPlace(searchText);
        }
        setSearchText(searchText);
        setSelectIndex(-1);
    }

    const handleForcus = () => {
        setShow(true);
    }

    const handleCurrentClick = () => {
        setSearchText("Searching...")
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((position) => {
                let lat = position.coords.latitude;
                let lng = position.coords.longitude;
                // lat = 106.66937064562853;
                // lng = 10.756702023310737;
                let strSearch = `${lat},${lng}`
                getPlaces(strSearch).then(response => {
                    let result = ""
                    if(response.data.features.length === 0) {
                        result = `[${lat},${lng}]`
                    }
                    else {
                        result = response.data.features[0].place_name;
                    }
                    setSearchText(result);
                    if(props.onChange) {
                        props.onChange(result);
                    }
                }).catch(err => {
                    console.log(err);
                });
            });
            
        }else {
            setSearchText("Can't get location");
        }
        setShow(false);
    }

    const onPlaceChange = (value, index) => {
        setSearchText(value);
        setShow(false);
        setShowRequired(true);
        if (props.onChange)
            props.onChange(value);
        setSelectIndex(index + 1);
    }

    const hanldeClickOut = (event) => {
        if (wraperWhere.current && !wraperWhere.current.contains(event.target)) {
            setShow(false);
        }
    }

    const onKeyPress = (event) => {
        if(show) {
            //Code Enter ArrowUp, ArrowDown
            switch(event.keyCode) {
                case 13:
                    {
                        if(selectIndex !== -1) {
                            if(selectIndex === 0) {
                                handleCurrentClick();
                            }
                            else {
                                onPlaceChange(arrPlace[selectIndex-1], selectIndex -1);
                            }
                            document.getElementById('search-place').blur();
                        }
                        break;
                    }
                case 40:
                    {
                        //down
                        let _selectIndex = selectIndex;
                        _selectIndex+=1;
                        if(_selectIndex > arrPlace.length) {
                            _selectIndex = 0;
                        }
                        setSelectIndex(_selectIndex);
                        break;
                    }
                case 38:
                    {
                        //up
                        let _selectIndex = selectIndex;
                        _selectIndex--;
                        if(_selectIndex < 0) {
                            _selectIndex = arrPlace.length;
                        }
                        setSelectIndex(_selectIndex);
                        break;
                    }
            }
        }
    }

    return (
        <>
            <label onClick={()=> {return;}}>where</label>
            <div ref={wraperWhere} className="where-container">
                <input id="search-place" onClick={handleForcus} onChange={handleSeachChange} type="text" placeholder="Singapore" value={searchText} autoComplete="off"></input>
                <div className={`where ${show && "show"}`}>
                    <div className="title">Search sugesstion</div>
                    <div className={`where-item ${selectIndex === 0 && "where-selected"}`} onClick={handleCurrentClick}>
                        <i className="fas fa-location-arrow"></i>
                        Current location
                    </div>

                    {arrPlace.length === 0 ?
                        <div className="where-item">No place find</div>
                        : arrPlace.map((place_name, index) => {
                            return <div  onClick={() => onPlaceChange(place_name, index)} key={index} className={`where-item ${selectIndex === (index + 1) && "where-selected"}`}>
                                {place_name}
                            </div>
                        })}
                </div>
                <div className={(isShowRequired && !props.isPickup) ? "required" : "none-required"}>Please select date as well</div>
            </div>
        </>
    )
}

export default Location;