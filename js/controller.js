var divSubstance;
var substance = "";

var divZoneInRoom;
var isZoneInRoom = null;

var divCloudInNormal;
var isCloudInNormal = null;

var divRoomFeature;
var roomFeature = false;

var divResult;
var result = "";

window.onload = () => {
    divSubstance = document.getElementById("divSubstance");
    divZoneInRoom = document.getElementById("divZoneInRoom");
    divCloudInNormal = document.getElementById("divCloudInNormal");
    divRoomFeature = document.getElementById("divRoomFeature");
    divResult = document.getElementById("divResult");
    OnSubstanceChange();
}

function HideDivZoneInRoom() {
    divZoneInRoom.hidden = true;
    HideDivCloudInNormal();
}

function HideDivCloudInNormal() {
    divCloudInNormal.hidden = true;
    HideDivRoomFeature();
}

function HideDivRoomFeature() {
    divRoomFeature.hidden = true;
}

function OnSubstanceChange() {
    substance = "";
    const options = [
        document.getElementById("rbГаз"),
        document.getElementById("rbЛВЖ"),
        document.getElementById("rbГЖ"),
        document.getElementById("rbВзрПыль"),
        document.getElementById("rbПожПыль"),
        document.getElementById("rbТГМ")
    ];
    for (const it of options) {
        if (it.checked) {
            substance = it.value;
            break;
        }
    }

    switch (substance) {
        case "Газ":
        case "ЛВЖ":
        case "ГЖ":
        case "ТГМ":
            divZoneInRoom.hidden = false;
            OnZoneInRoomChange();
            break;
        case "ВзрПыль":
        case "ПожПыль":
            HideDivZoneInRoom();
            document.getElementById("rbВПомещении").checked = true;
            OnZoneInRoomChange();
            break;
        default:
            divResult.hidden = true;
            break;
    }
}

function OnZoneInRoomChange() {
    isZoneInRoom = null;
    if (document.getElementById("rbВПомещении").checked) isZoneInRoom = true;
    else if (document.getElementById("rbВнеПомещения").checked) isZoneInRoom = false;

    switch (isZoneInRoom) {
        case true:
            switch (substance) {
                case "ГЖ":
                    result = "П-I (ПУЭ 7.4.3)";
                    HideDivCloudInNormal();
                    ShowResult();
                    break;
                case "ПожПыль":
                    result = "П-II (ПУЭ 7.4.4)";
                    HideDivCloudInNormal();
                    ShowResult();
                    break;
                case "ТГМ":
                    result = "П-IIа (ПУЭ 7.4.5)";
                    HideDivCloudInNormal();
                    ShowResult();
                    break;                       
                default:
                    divCloudInNormal.hidden = false;
                    OnCloudInNormalChange();
                    break;
            }
            break;
        case false:
            if (substance == "Газ" || substance == "ЛВЖ") result = "В-Iг (ПУЭ 7.3.43)";
            else result = "П-III (ПУЭ 7.4.6)";
            HideDivCloudInNormal();
            ShowResult();
            break;
        default:
            divResult.hidden = true;
            break;
    }    
}

function OnCloudInNormalChange() {
    isCloudInNormal = null;
    if (document.getElementById("rbПриНормРаботе").checked) isCloudInNormal = true;
    else if (document.getElementById("rbПриАварии").checked) isCloudInNormal = false;

    switch (isCloudInNormal) {
        case true:
            switch (substance) {
                case "Газ":
                case "ЛВЖ":
                    result = "В-I (ПУЭ 7.3.40)";
                    HideDivRoomFeature();
                    ShowResult();
                    break;
                case "ВзрПыль":
                    result = "В-II (ПУЭ 7.3.45)";
                    HideDivRoomFeature();
                    ShowResult();
                    break;               
                default:
                    break;
            }
            break;
        case false:
            if (substance == "ВзрПыль") {
                result = "В-IIа (ПУЭ 7.3.46)";
                HideDivRoomFeature();
                ShowResult();
            }
            else {
                divRoomFeature.hidden = false;
                OnRoomFeatureChange();
            }        
            break;       
        default:
            divResult.hidden = true;
            break;
    }
}

function OnRoomFeatureChange() {
    roomFeature = null;
    const options = [
        document.getElementById("rbАммиак"),
        document.getElementById("rbВодород"),
        document.getElementById("rbЛаборатория"),
        document.getElementById("rbNoFeature")
    ];
    for (const it of options) {
        if (it.checked) {
            roomFeature = it.value;
            break;
        }
    }

    switch (roomFeature) {
        case "true":
            result = "В-Iб (ПУЭ 7.3.42)";
            ShowResult();
            break;
        case "false":
            result = "В-Iа (ПУЭ 7.3.41)";
            ShowResult();
            break;
        default:
            divResult.hidden = true;
            break;
    }
}

function ShowResult() {
    divResult.innerText = `Класс зоны: ${result}.`;
    divResult.hidden = false;
    // for (const it of description) {
    //     let p = document.createElement("p");
    //     p.innerText = it;
    //     p.style.lineHeight = 1.0;
    //     divResult.appendChild(p);
    // }
}