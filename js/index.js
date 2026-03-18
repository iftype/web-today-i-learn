// 페이지 로드 확인용
console.log("스크립트가 정상적으로 로드되었습니다.");

document.addEventListener("DOMContentLoaded", () => {
  const tilForm = document.querySelector("#til-form");
  const tilList = document.querySelector("#til-list");

  // 폼이 존재하는지 확인
  if (!tilForm) {
    console.error("ID가 'til-form'인 요소를 찾을 수 없습니다.");
    return;
  }

  tilForm.addEventListener("submit", (event) => {
    // [중요] 새로고침 방지! 이게 안 되면 그냥 페이지가 넘어가버립니다.
    event.preventDefault();
    console.log("등록 버튼이 클릭되었습니다.");

    const dateInput = document.querySelector("#til-date");
    const titleInput = document.querySelector("#til-title");
    const contentInput = document.querySelector("#til-content");

    const date = dateInput.value;
    const title = titleInput.value;
    const content = contentInput.value;

    // 새로운 TIL 카드 생성
    const newArticle = document.createElement("article");

    // 디자인을 위해 클래스 추가 (선택사항)
    newArticle.classList.add("til-item");

    newArticle.innerHTML = `
      <h3><time datetime="${date}">${date}</time> ${title}</h3>
      <p>${content}</p>
    `;

    // 목록 맨 위에 추가
    if (tilList) {
      tilList.prepend(newArticle);
      console.log("목록에 추가 완료!");
    } else {
      // 만약 til-list가 없으면 body 맨 뒤에라도 붙임
      document.body.appendChild(newArticle);
    }

    // 입력창 초기화
    tilForm.reset();
  });
});
