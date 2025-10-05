
import PDFDocument from "pdfkit";
import path from "path";
import moment from "moment";
import Product from "../models/product.js";

const __dirname = path.resolve();

export const generateStockReport = async (req, res) => {
  try {
    let products;
    if (req.query.filter) {
      products = await Product.find({ quantity: { $lt: 10 } }).sort({ createdAt: -1 });
    } else {
      products = await Product.find().sort({ createdAt: -1 });
    }

    if (!products.length) {
      return res.status(404).json({ message: "No products found", status: false });
    }

    const doc = new PDFDocument({ margin: 40, size: "A4" });
    res.setHeader("Content-Type", "application/pdf");
    res.setHeader(
      "Content-Disposition",
      "attachment; filename=HydraFoods_Stock_Report.pdf"
    );
    doc.pipe(res);

    // ===== HEADER =====
    const logoPath = path.join(__dirname, "assets/hydrafoods_logo.png");
    const startY = 40;

    try {
      doc.image(logoPath, 50, startY, { width: 70 });
    } catch {
      console.log("Logo not found, skipping...");
    }

    const headerLeft = 130;
    const lineGap = 18;

    doc
      .font("Helvetica-Bold")
      .fontSize(20)
      .text("Hydra Foods", headerLeft, startY + 5, { align: "left" });

    doc
      .font("Helvetica")
      .fontSize(12)
      .text("Inventory Stock Report", headerLeft, startY + lineGap + 8);

    doc
      .fontSize(9)
      .text(
        `Generated on: ${moment().format("YYYY-MM-DD HH:mm:ss")}`,
        headerLeft,
        startY + lineGap * 2 + 5
      )
      .text(
        `Total Products: ${products.length}`,
        headerLeft,
        startY + lineGap * 3 + 5
      );

    // Divider
    const dividerY = startY + lineGap * 4 + 15;
    doc.moveTo(40, dividerY).lineTo(560, dividerY)
      .strokeColor("#A0A0A0").lineWidth(1).stroke();

    // ===== TABLE HEADER =====
    const tableTop = dividerY + 25;
    const colX = {
      itemId: 45,
      name: 110,
      quantity: 260,
      price: 310,
      total: 380,
      status: 460,
      createdAt: 525
    };

    // Gray header background
    doc.rect(40, tableTop - 5, 520, 18).fill("#F4F4F4").stroke();

    doc.fillColor("#000000").font("Helvetica-Bold").fontSize(8.5)
      .text("Item ID", colX.itemId, tableTop)
      .text("Product Name", colX.name, tableTop)
      .text("Qty", colX.quantity, tableTop, { width: 30, align: "center" })
      .text("Price (Rs)", colX.price, tableTop, { width: 50, align: "right" })
      .text("Total (Rs)", colX.total, tableTop, { width: 60, align: "right" })
      .text("Stock", colX.status, tableTop, { width: 50, align: "center" })
      .text("Created At", colX.createdAt, tableTop, { width: 70, align: "center" });

    doc.moveTo(40, tableTop + 12).lineTo(560, tableTop + 12)
      .strokeColor("#000000").stroke();

    // ===== TABLE BODY =====
    let y = tableTop + 25;
    const rowHeight = 16;
    let totalInventoryValue = 0;
    doc.font("Helvetica").fontSize(8.5);

    for (const p of products) {
      const totalValue = p.price * p.quantity;
      totalInventoryValue += totalValue;

      const bgColor =
        p.quantity < 10 ? "#FDECEC" :
        p.quantity <= 30 ? "#FFF9E6" :
        "#E9F9EE";

      if (y > 730) {
        doc.addPage();
        y = 100;
      }

      doc.rect(40, y - 3, 520, 14).fill(bgColor).stroke();
      doc.fillColor("#000000");

      doc.text(p.itemId, colX.itemId, y);
      doc.text(p.name, colX.name, y, { width: 140 });
      doc.text(p.quantity.toString(), colX.quantity, y, { width: 30, align: "center" });
      doc.text(`Rs. ${p.price.toLocaleString()}`, colX.price, y, { width: 50, align: "right" });
      doc.text(`Rs. ${totalValue.toLocaleString()}`, colX.total, y, { width: 60, align: "right" });
      doc.text(
        p.quantity < 10 ? "LOW" : p.quantity <= 30 ? "MEDIUM" : "OK",
        colX.status,
        y,
        { width: 50, align: "center" }
      );
      doc.text(moment(p.createdAt).format("YYYY-MM-DD"), colX.createdAt, y, { width: 70, align: "center" });

      y += rowHeight;
    }

    // ===== SUMMARY =====
    y += 10;
    doc.moveTo(40, y).lineTo(560, y).strokeColor("#000000").stroke();
    y += 12;
    doc.font("Helvetica-Bold").fontSize(9.5)
      .text(
        `Total Inventory Value: Rs. ${totalInventoryValue.toLocaleString()}`,
        40, y, { align: "right" }
      );

    // ===== FOOTER =====
    doc.font("Helvetica").fontSize(9).fillColor("#333333")
      .text("Hydra Foods Pvt. Ltd.", 40, 760, { align: "center" })
      .text("Contact: info@hydrafoods.com | +92 300 1234567", { align: "center" })
      .text("Address: Industrial Zone, Karachi, Pakistan", { align: "center" })
      .moveDown(0.3).fontSize(6)
      .text("© 2025 Hydra Foods. All Rights Reserved.", { align: "center" });

    doc.end();
  } catch (error) {
    res.status(500).json({
      message: error.message || "Something went wrong while generating report",
      status: false,
    });
  }
};

