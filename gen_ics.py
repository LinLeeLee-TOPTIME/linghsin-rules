#!/usr/bin/env python3
# Generate an ICS calendar for June 2026 (Asia/Taipei).
events = [
    # (date, all_day_title) or (date, start, end, title)
    ("20260601", "0730", "0830", "分會"),
    ("20260602", "辰慶生"),
    ("20260603", "0800", "0900", "複訓"),
    ("20260604", "0800", "0900", "高峰"),
    ("20260605", "辰心"),
    ("20260605", "1800", "2000", "極辰直播"),
    ("20260606", "園"),
    ("20260606", "0730", "0830", "濟世"),
    ("20260608", "0630", "0730", "分會"),
    ("20260608", "0730", "0830", "分會"),
    ("20260609", "辰心"),
    ("20260610", "0800", "0900", "複訓"),
    ("20260611", "三重"),
    ("20260612", "0800", "0900", "複訓"),
    ("20260613", "待佈施"),
    ("20260613", "0730", "0830", "濟世"),
    ("20260613", "0820", "0920", "黃金果畢業典禮"),
    ("20260613", "1300", "1400", "中路體驗會"),
    ("20260614", "花5果"),
    ("20260615", "士慶生"),
    ("20260615", "0730", "0830", "分會"),
    ("20260616", "宮廟學習"),
    ("20260616", "竹林寺"),
    ("20260617", "0800", "0900", "複訓"),
    ("20260618", "0800", "0900", "賀節"),
    ("20260619", "端午節"),
    ("20260620", "0730", "0830", "濟世"),
    ("20260622", "0730", "0830", "分會"),
    ("20260623", "天元宮"),
    ("20260623", "宮廟學習"),
    ("20260623", "辰心"),
    ("20260624", "0800", "0900", "複訓"),
    ("20260625", "三重"),
    ("20260626", "0800", "0900", "祝壽"),
    ("20260627", "關聖帝君"),
    ("20260627", "0730", "0830", "濟世"),
    ("20260628", "花5果"),
    ("20260629", "清淨身"),
    ("20260629", "0730", "0830", "分會"),
    ("20260630", "清淨身"),
    ("20260630", "辰心"),
]

def next_day(d):
    import datetime
    dt = datetime.datetime.strptime(d, "%Y%m%d") + datetime.timedelta(days=1)
    return dt.strftime("%Y%m%d")

lines = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//linghsin//calendar 2026-06//ZH-TW",
    "CALSCALE:GREGORIAN",
    "BEGIN:VTIMEZONE",
    "TZID:Asia/Taipei",
    "BEGIN:STANDARD",
    "DTSTART:19700101T000000",
    "TZOFFSETFROM:+0800",
    "TZOFFSETTO:+0800",
    "TZNAME:CST",
    "END:STANDARD",
    "END:VTIMEZONE",
]

for i, ev in enumerate(events):
    uid = f"linghsin-202606-{i:03d}@local"
    lines.append("BEGIN:VEVENT")
    lines.append(f"UID:{uid}")
    lines.append("DTSTAMP:20260531T000000Z")
    if len(ev) == 2:
        date, title = ev
        lines.append(f"DTSTART;VALUE=DATE:{date}")
        lines.append(f"DTEND;VALUE=DATE:{next_day(date)}")
    else:
        date, s, e, title = ev
        lines.append(f"DTSTART;TZID=Asia/Taipei:{date}T{s}00")
        lines.append(f"DTEND;TZID=Asia/Taipei:{date}T{e}00")
    lines.append(f"SUMMARY:{title}")
    lines.append("END:VEVENT")

lines.append("END:VCALENDAR")

with open("linghsin-2026-06.ics", "w", encoding="utf-8") as f:
    f.write("\r\n".join(lines) + "\r\n")
print("done", len(events), "events")
