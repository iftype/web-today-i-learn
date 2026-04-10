# DDL 실습

## 문제 1: 테이블 생성하기 (CREATE TABLE)

### 1. attendance 테이블은 중복된 데이터가 쌓이는 구조이다. 중복된 데이터는 어떤 컬럼인가?

crew_id, nickname

### 2.attendance 테이블에서 중복을 제거하기 위해 crew 테이블을 만들려고 한다. 어떻게 구성해 볼 수 있을까?

| crew_id:INT | nickname:VARCHAR |
| :---------- | :--------------- |
| 1           | 검프             |
| 2           | 구구             |
| ...         | ...              |

### 3.crew 테이블에 들어가야 할 크루들의 정보는 어떻게 추출할까? (hint: DISTINCT)

```sql
 SELECT DISTINCT crew_id, nickname FROM attendance;
```

### 4.최종적으로 crew 테이블 생성:

```sql
CREATE TABLE crew (
  crew_id INT NOT NULL AUTO_INCREMENT,
  nickname VARCHAR(10) NOT NULL,
  PRIMARY KEY (crew_id)
);
```

### 5.attendance 테이블에서 크루 정보를 추출해서 crew 테이블에 삽입하기:

```sql
INSERT INTO crew (nickname)
SELECT DISTINCT nickname
FROM attendance;

-- 확인하기
SELECT * FROM crew;
```

## 문제 2: 테이블 컬럼 삭제하기 (ALTER TABLE)

### 1. crew 테이블을 만들고 중복을 제거했다. attendance에서 불필요해지는 컬럼은?

nickname

### 2. 컬럼을 삭제하려면 어떻게 해야 하는가?

```sql
ALTER TABLE attendance DROP COLUMN nickname;
```

## 문제 3: 외래키 설정하기

### 만약에 crew 테이블에는 crew_id가 12번인 크루가 존재하지 않지만, attendance 테이블에는 여전히 crew_id가 12번인 크루가 존재한다면?

```sql
ALTER TABLE attendance
ADD FOREIGN KEY (crew_id)
REFERENCES crew(crew_id)
```

## 문제 4: 유니크 키 설정

### 우아한테크코스에서는 닉네임의 '중복'이 엄연히 금지된다. 그런데 현재 테이블에는 중복된 닉네임이 담길 수 있다. crew 테이블의 결함을 어떻게 해결할 수 있을까?

```sql
ALTER TABLE crew
ADD UNIQUE (nickname);
```

## 문제 5: 크루 닉네임 검색하기 (LIKE)

### 3월 4일, 아침에 검프에게 어떤 크루가 상냥하게 인사했다. 그런데 검프도 구면인 것 같아서 닉네임 첫 글자가 디라는 건 떠올랐는데... 누구지?

```sql
SELECT nickname FROM crew
WHERE nickname LIKE "디%"
```

## 문제 6: 출석 기록 확인하기 (SELECT + WHERE)

```sql
SELECT * FROM attendance
WHERE nickname = '어셔'
and attendance_date BETWEEN '2026-03-06' AND '2026-03-06'
```

## 문제 7: 누락된 출석 기록 추가 (INSERT)

```sql

INSERT INTO attendance (crew_id, nickname, attendance_date, start_time, end_time)
SELECT crew_id, nickname, '2025-03-09', '10:00:00', '18:00:00'
FROM crew
WHERE nickname = "시지프";
```
