import express from 'express';
import { Resend } from 'resend';
import cors from 'cors';

const app = express();
const PORT = process.env.PORT || 3001;
const RESEND_API_KEY = process.env.RESEND_API_KEY;
const TO_EMAIL = 'liszzmword@gmail.com';

if (!RESEND_API_KEY) {
  console.error('RESEND_API_KEY 환경 변수를 설정해주세요.');
  console.error('예: RESEND_API_KEY=re_xxxxx node server.js');
  process.exit(1);
}

const resend = new Resend(RESEND_API_KEY);

app.use(cors());
app.use(express.json());

app.post('/api/contact', async (req, res) => {
  try {
    const { name, phone, email } = req.body;

    if (!name || !phone || !email) {
      return res.status(400).json({
        success: false,
        message: '이름, 전화번호, 이메일을 모두 입력해주세요.',
      });
    }

    const { data, error } = await resend.emails.send({
      from: '일본어 퀴즈 문의 <onboarding@resend.dev>',
      to: [TO_EMAIL],
      subject: `[문의] 일본어 퀴즈 - ${name}`,
      html: `
        <h2>새 문의가 도착했습니다</h2>
        <p><strong>이름:</strong> ${name}</p>
        <p><strong>전화번호:</strong> ${phone}</p>
        <p><strong>이메일:</strong> ${email}</p>
        <hr>
        <p><small>일본어 단어 퀴즈 웹사이트 문의 폼</small></p>
      `,
    });

    if (error) {
      console.error('Resend error:', error);
      return res.status(500).json({
        success: false,
        message: '이메일 전송에 실패했습니다. 잠시 후 다시 시도해주세요.',
      });
    }

    res.json({ success: true, message: '문의가 성공적으로 전송되었습니다.' });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      message: '서버 오류가 발생했습니다.',
    });
  }
});

app.listen(PORT, () => {
  console.log(`서버 실행 중: http://localhost:${PORT}`);
});
