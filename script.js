let placements = {};

function allowDrop(ev) {
    ev.preventDefault();
}

function drag(ev) {
    // الحصول على المعرف من الحاوية الأب إذا كانت الصورة هي المسحوبة
    const woodElement = ev.target.closest(".wood");
    if (woodElement) {
        ev.dataTransfer.setData("text", woodElement.id);
    }
}

function drop(ev, part) {
    ev.preventDefault();
    const woodId = ev.dataTransfer.getData("text");
    const woodElement = document.getElementById(woodId);

    // التأكد من أن العنصر المراد إضافته هو حاوية الخشب الكاملة
    if (woodElement && woodElement.classList.contains("wood")) {
        ev.target.innerHTML = "";
        ev.target.appendChild(woodElement);
        placements[part] = woodId;
    } else {
        console.error("العنصر غير صالح للإسقاط.");
    }
}

function evaluateChoice() {
    let score = 0;

    // تقييم الأعمدة
    if (placements["columns"] === "oak") score += 3;
    else if (placements["columns"] === "pine") score += 2;
    else score += 1;

    // تقييم السقف
    if (placements["roof"] === "pine") score += 3;
    else if (placements["roof"] === "oak") score += 2;
    else score += 1;

    // تقييم الأرضية
    if (placements["floor"] === "oak") score += 3;
    else if (placements["floor"] === "beech") score += 2;
    else score += 1;

    const result = document.getElementById("result");
    if (score >= 8) {
        result.textContent = "مبروك! اختيار ممتاز!";
    } else if (score >= 5) {
        result.textContent = "جيد! لكن يمكن تحسين الاختيار.";
    } else {
        result.textContent = "الاختيار غير مناسب، حاول مرة أخرى!";
    }
}

// إضافة مستمعين للأحداث
document.querySelectorAll('.wood').forEach(wood => {
    wood.addEventListener('dragstart', drag);
});

document.querySelectorAll('.dropzone').forEach(zone => {
    zone.addEventListener('dragover', allowDrop);
    zone.addEventListener('drop', (ev) => drop(ev, zone.id));
});

