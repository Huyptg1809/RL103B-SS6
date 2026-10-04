let orderCode = "";
let isOrderValid = false;
let isVIP = false;
let shakerQty = 0;
let glovesQty = 0;
let strapQty = 0;
let choice = "";

do {
    console.log("========================================");
    console.log("   HỆ THỐNG BÁN LẺ PHỤ KIỆN GYM FIT     ");
    console.log("========================================");
    console.log("1: Nhập và chuẩn hóa mã đơn hàng");
    console.log("2: Tính tiền và in hóa đơn phụ kiện");
    console.log("3: Thoát chương trình");
    console.log("========================================");

    let inputChoice = prompt("Vui lòng chọn (1 - 3):");
    if (inputChoice === null) {
        break;
    }
    choice = inputChoice.trim();

    switch (choice) {
        case "1": {
            let rawInput = prompt("Nhập mã đơn hàng:");
            if (rawInput === null) {
                console.log("Chưa nhập mã đơn hàng.");
                break;
            }

            let cleanedCode = rawInput.trim().toUpperCase();

            if (cleanedCode.length < 8) {
                console.log("Lỗi: Mã đơn hàng phải có độ dài tối thiểu 8 ký tự!");
                isOrderValid = false;
                break;
            }

            let isVipMember = cleanedCode.startsWith("VIP-");
            let isStandard = cleanedCode.startsWith("ORD-") || cleanedCode.startsWith("GYM-");

            if (!isVipMember && !isStandard) {
                console.log("Lỗi: Mã đơn phải bắt đầu bằng VIP- hoặc ORD-/GYM-!");
                isOrderValid = false;
                break;
            }

            let itemsPart = cleanedCode.slice(4);
            let countShaker = 0;
            let countGloves = 0;
            let countStrap = 0;
            let hasInvalidItem = false;
            let startIdx = 0;

            for (let i = 0; i <= itemsPart.length; i++) {
                if (i === itemsPart.length || itemsPart[i] === "-") {
                    let item = itemsPart.slice(startIdx, i);
                    if (item === "SHAKER") {
                        countShaker++;
                    } else if (item === "GLOVES") {
                        countGloves++;
                    } else if (item === "STRAP") {
                        countStrap++;
                    } else if (item !== "") {
                        hasInvalidItem = true;
                    }
                    startIdx = i + 1;
                }
            }

            if (hasInvalidItem || (countShaker === 0 && countGloves === 0 && countStrap === 0)) {
                console.log("Lỗi: Phụ kiện không hợp lệ! Chỉ chấp nhận SHAKER, GLOVES, STRAP.");
                isOrderValid = false;
                break;
            }

            orderCode = cleanedCode;
            isVIP = isVipMember;
            shakerQty = countShaker;
            glovesQty = countGloves;
            strapQty = countStrap;
            isOrderValid = true;

            console.log("Đã lưu mã đơn hàng hợp lệ: " + orderCode);
            break;
        }

        case "2": {
            if (!isOrderValid) {
                console.log("Lỗi: Chưa có mã đơn hàng hợp lệ! Vui lòng chọn 1 để nhập mã trước.");
                break;
            }

            let priceShaker = 120000;
            let priceGloves = 180000;
            let priceStrap = 150000;

            let subtotal = (shakerQty * priceShaker) + (glovesQty * priceGloves) + (strapQty * priceStrap);
            let discount = isVIP ? (subtotal * 0.1) : 0;
            let finalAmount = subtotal - discount;

            let border = "-".repeat(40);

            console.log(border);
            console.log("       HÓA ĐƠN BÁN LẺ PHỤ KIỆN GYM      ");
            console.log(border);
            console.log("Mã đơn hàng: " + orderCode);
            console.log("Khách hàng : " + (isVIP ? "Hội viên VIP (Giảm 10%)" : "Khách hàng tiêu chuẩn"));
            console.log(border);
            console.log("Phụ kiện".padEnd(16) + "SL".padStart(6) + "Thành tiền".padStart(18));
            console.log(border);

            if (shakerQty > 0) {
                let itemTotal = (shakerQty * priceShaker).toLocaleString("vi-VN") + " VNĐ";
                console.log("Bình lắc".padEnd(16) + String(shakerQty).padStart(6) + itemTotal.padStart(18));
            }
            if (glovesQty > 0) {
                let itemTotal = (glovesQty * priceGloves).toLocaleString("vi-VN") + " VNĐ";
                console.log("Găng tay".padEnd(16) + String(glovesQty).padStart(6) + itemTotal.padStart(18));
            }
            if (strapQty > 0) {
                let itemTotal = (strapQty * priceStrap).toLocaleString("vi-VN") + " VNĐ";
                console.log("Dây kéo lưng".padEnd(16) + String(strapQty).padStart(6) + itemTotal.padStart(18));
            }

            console.log(border);
            let subtotalStr = subtotal.toLocaleString("vi-VN") + " VNĐ";
            console.log("Tổng tiền:" + subtotalStr.padStart(40 - "Tổng tiền:".length));

            if (isVIP) {
                let discountStr = "-" + discount.toLocaleString("vi-VN") + " VNĐ";
                console.log("Giảm giá VIP (10%):" + discountStr.padStart(40 - "Giảm giá VIP (10%):".length));
            }

            console.log(border);
            let finalStr = finalAmount.toLocaleString("vi-VN") + " VNĐ";
            console.log("THANH TOÁN:" + finalStr.padStart(40 - "THANH TOÁN:".length));
            console.log(border);

            break;
        }

        case "3": {
            console.log("Đã thoát chương trình.");
            break;
        }

        default: {
            console.log("Lỗi: Lựa chọn không hợp lệ! Vui lòng chọn từ 1 đến 3.");
            break;
        }
    }
} while (choice !== "3");
