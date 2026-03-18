// TODO: TIL 폼 등록 기능을 구현하세요
// 1. 폼 요소와 목록 요소를 querySelector로 선택합니다.
// 2. 폼의 submit 이벤트를 감지하여 새 TIL 항목을 목록에 추가합니다.

const tilForm = document.querySelector("#til-form");
const tilList = document.querySelector("#til-list");

tilForm.addEventListener("submit", function (event) {
  event.preventDefault();

  // TODO: TIL 폼 등록 기능을 구현하세요
  // 1. 폼 요소와 목록 요소를 querySelector로 선택합니다.

  tilForm.addEventListener("submit", function (event) {
    event.preventDefault();

    // 2. 입력값을 가져옵니다.
    const dateInput = document.querySelector("#til-date");
    const titleInput = document.querySelector("#til-title");
    const contentInput = document.querySelector("#til-content");

    const date = dateInput.value;
    const title = titleInput.value;
    const content = contentInput.value;

    // 빈 값이 있는지 확인 (간단한 유효성 검사)
    if (!date || !title || !content) {
      alert("모든 내용을 입력해주세요!");
      return;
    }

    // 3. 새 TIL 항목(article)을 생성합니다.
    const newArticle = document.createElement("article");

    // 제목과 날짜 영역 구성
    const h3 = document.createElement("h3");
    const time = document.createElement("time");
    time.setAttribute("datetime", date);
    time.textContent = date;

    h3.appendChild(time);
    h3.append(` - ${title}`);

    // 내용 영역 구성
    const p = document.createElement("p");
    p.textContent = content;

    // article에 합치기
    newArticle.appendChild(h3);
    newArticle.appendChild(p);

    // 4. 목록의 가장 위에 추가합니다.
    tilList.prepend(newArticle);

    // 5. 입력 폼 초기화
    tilForm.reset();
  });
});
