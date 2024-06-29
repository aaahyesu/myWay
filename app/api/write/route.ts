const handleSubmit = async () => {
  try {
    const response = await fetch('/api/upload', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        title: '제목',
        theme: '테마',
        origin: '출발지',
        destination: '도착지',
        location: '장소',
        description: '상세 내용',
        categories: ['카테고리1', '카테고리2']
      }),
    });

    const data = await response.json();
    console.log(data); // 서버 응답 확인
  } catch (error) {
    console.error('Error:', error);
  }
};
