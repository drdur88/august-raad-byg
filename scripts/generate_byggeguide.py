# -*- coding: utf-8 -*-
from reportlab.lib.pagesizes import A4
from reportlab.lib.units import mm
from reportlab.lib.styles import ParagraphStyle
from reportlab.lib.enums import TA_LEFT, TA_CENTER
from reportlab.platypus import (
    SimpleDocTemplate, Paragraph, Spacer, Table, TableStyle, HRFlowable, PageBreak
)
from reportlab.lib import colors

NAVY = colors.HexColor("#2d3748")
GOLD = colors.HexColor("#b8956a")
GREY = colors.HexColor("#6b7280")
OFFWHITE = colors.HexColor("#f7f6f4")

OUT_PATH = "public/downloads/byggeguide.pdf"

styles = {
    "title": ParagraphStyle(
        "title", fontName="Helvetica-Bold", fontSize=28, leading=32,
        textColor=NAVY, spaceAfter=6, alignment=TA_LEFT,
    ),
    "subtitle": ParagraphStyle(
        "subtitle", fontName="Helvetica-Oblique", fontSize=13, leading=18,
        textColor=GOLD, spaceAfter=28,
    ),
    "h2": ParagraphStyle(
        "h2", fontName="Helvetica-Bold", fontSize=17, leading=21,
        textColor=NAVY, spaceBefore=18, spaceAfter=10,
    ),
    "body": ParagraphStyle(
        "body", fontName="Helvetica", fontSize=10.5, leading=16,
        textColor=NAVY, spaceAfter=6,
    ),
    "bodygrey": ParagraphStyle(
        "bodygrey", fontName="Helvetica", fontSize=10.5, leading=16,
        textColor=GREY, spaceAfter=10,
    ),
    "stepnum": ParagraphStyle(
        "stepnum", fontName="Helvetica-Bold", fontSize=13, leading=16,
        textColor=colors.white, alignment=TA_CENTER,
    ),
    "steptitle": ParagraphStyle(
        "steptitle", fontName="Helvetica-Bold", fontSize=11.5, leading=15,
        textColor=NAVY, spaceAfter=2,
    ),
    "stepdesc": ParagraphStyle(
        "stepdesc", fontName="Helvetica", fontSize=10, leading=14,
        textColor=GREY,
    ),
    "bullet": ParagraphStyle(
        "bullet", fontName="Helvetica", fontSize=10.5, leading=16,
        textColor=NAVY, leftIndent=14, bulletIndent=0, spaceAfter=6,
    ),
    "footer_brand": ParagraphStyle(
        "footer_brand", fontName="Helvetica-Bold", fontSize=15, leading=19,
        textColor=colors.white, alignment=TA_CENTER, spaceAfter=8,
    ),
    "footer_body": ParagraphStyle(
        "footer_body", fontName="Helvetica", fontSize=11, leading=17,
        textColor=colors.white, alignment=TA_CENTER, spaceAfter=4,
    ),
    "footer_contact": ParagraphStyle(
        "footer_contact", fontName="Helvetica-Bold", fontSize=11.5, leading=18,
        textColor=GOLD, alignment=TA_CENTER, spaceAfter=2,
    ),
    "eyebrow": ParagraphStyle(
        "eyebrow", fontName="Helvetica-Bold", fontSize=9, leading=12,
        textColor=GOLD, spaceAfter=4,
    ),
}

doc = SimpleDocTemplate(
    OUT_PATH, pagesize=A4,
    topMargin=28 * mm, bottomMargin=22 * mm,
    leftMargin=22 * mm, rightMargin=22 * mm,
)

story = []

# ── Cover / intro ──
story.append(Paragraph("AUGUST RÅD &amp; BYG", styles["eyebrow"]))
story.append(Paragraph("Sådan planlægger du dit byggeprojekt", styles["title"]))
story.append(Paragraph("En praktisk guide fra August Råd &amp; Byg", styles["subtitle"]))
story.append(HRFlowable(width="100%", thickness=1, color=GOLD, spaceAfter=16))
story.append(Paragraph(
    "Uanset om du planlægger en total renovering, en tilbygning eller blot skal have malet "
    "stuen, er de samme grundregler afgørende for et trygt og vellykket forløb. Denne guide "
    "samler de vigtigste trin, faldgruber og spørgsmål, så du kan gå ind i dit projekt med "
    "ro i maven.",
    styles["body"],
))
story.append(Spacer(1, 10))

# ── 5 trin ──
story.append(Paragraph("5 trin til dit byggeprojekt", styles["h2"]))

steps = [
    ("1", "Definér dit behov og budget",
     "Skriv ned hvad projektet skal løse, og sæt en realistisk økonomisk ramme før du "
     "kontakter håndværkere."),
    ("2", "Indhent uforpligtende tilbud",
     "Bed om mindst 2-3 tilbud, så du kan sammenligne pris, omfang og tidsplan på lige fod."),
    ("3", "Tjek håndværkerens erfaring og anmeldelser",
     "Se tidligere projekter, bed om referencer, og undersøg om firmaet er momsregistreret "
     "og forsikret."),
    ("4", "Få alt på skrift",
     "Fast pris, tidsplan, betalingsvilkår og hvad der er inkluderet skal stå i en skriftlig "
     "aftale, inden arbejdet går i gang."),
    ("5", "Løbende opfølgning under udførelsen",
     "Aftal faste statusopdateringer, så I begge ved hvor projektet står — og kan reagere "
     "hurtigt, hvis noget ændrer sig."),
]

for num, title, desc in steps:
    row = Table(
        [[Paragraph(num, styles["stepnum"]),
          [Paragraph(title, styles["steptitle"]), Paragraph(desc, styles["stepdesc"])]]],
        colWidths=[26, None],
    )
    row.setStyle(TableStyle([
        ("VALIGN", (0, 0), (-1, -1), "TOP"),
        ("BACKGROUND", (0, 0), (0, 0), NAVY),
        ("TOPPADDING", (0, 0), (0, 0), 5),
        ("LEFTPADDING", (1, 0), (1, 0), 12),
        ("BOTTOMPADDING", (0, 0), (-1, -1), 10),
    ]))
    story.append(row)
    story.append(Spacer(1, 4))

story.append(Spacer(1, 8))

# ── Faldgruber ──
story.append(Paragraph("Typiske faldgruber", styles["h2"]))
faldgruber = [
    "Ingen fast pris aftalt på forhånd — kun et løst mundtligt overslag.",
    "Ingen skriftlig tidsplan, så forsinkelser ikke kan holdes op mod noget konkret.",
    "At vælge håndværker udelukkende på laveste pris, uden at tjekke kvalitet.",
    "At springe referencer og tidligere kunders anmeldelser over.",
]
for item in faldgruber:
    story.append(Paragraph(f"—  {item}", styles["bullet"]))

story.append(Spacer(1, 8))

# ── Spørgsmål ──
story.append(Paragraph("Spørgsmål du bør stille din håndværker", styles["h2"]))
questions = [
    "Har du erfaring med projekter magen til mit?",
    "Kan jeg se billeder eller referencer fra tidligere opgaver?",
    "Hvad er inkluderet i prisen — og hvad er ikke?",
    "Hvordan håndterer vi eventuelle ændringer undervejs?",
    "Hvem er mit faste kontaktpunkt gennem hele projektet?",
]
for q in questions:
    story.append(Paragraph(f"—  {q}", styles["bullet"]))

story.append(PageBreak())

# ── Closing / contact (footer-style navy block) ──
closing = Table(
    [[Paragraph("August Råd &amp; Byg", styles["footer_brand"])],
     [Paragraph(
         "Vi tilbyder altid en gratis og uforpligtende samtale om dit projekt. "
         "Tag fat i os, når du er klar til næste skridt.",
         styles["footer_body"])],
     [Spacer(1, 10)],
     [Paragraph("+45 12 34 56 78", styles["footer_contact"])],
     [Paragraph("info@augustraadogbyg.dk", styles["footer_contact"])],
     ],
    colWidths=[doc.width],
)
closing.setStyle(TableStyle([
    ("BACKGROUND", (0, 0), (-1, -1), NAVY),
    ("TOPPADDING", (0, 0), (-1, 0), 34),
    ("BOTTOMPADDING", (0, -1), (-1, -1), 34),
    ("LEFTPADDING", (0, 0), (-1, -1), 24),
    ("RIGHTPADDING", (0, 0), (-1, -1), 24),
    ("TOPPADDING", (0, 1), (-1, 1), 0),
]))
story.append(Spacer(1, 60))
story.append(closing)

doc.build(story)
print("Wrote", OUT_PATH)
