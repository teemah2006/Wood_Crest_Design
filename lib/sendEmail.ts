import { Resend } from "resend";
import { AddContacts } from "./addContact";

const resend = new Resend(process.env.RESEND_API_KEY);

export const sendEmail = async ({
  to,
  subject,
  name,
}: {
  to: string;
  subject: string;
  name: string;
}) => {
  const htmlContent = `
  <div style="font-family: Arial, sans-serif; color: #333; background-color: #f7f7f7; padding: 40px 0;">
    <div style="max-width: 600px; margin: 0 auto; background: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 8px rgba(0,0,0,0.05);">
      <div style="background-color: #2C2C2C; color: #F5F5F5; text-align: center; padding: 24px;">
        <h1 style="margin: 0; font-size: 24px; font-weight: 600;">WoodCrest Designs</h1>
      </div>

      <div style="padding: 32px;">
        <h2 style="font-size: 20px; color: #2C2C2C;">Hi ${name},</h2>
        <p style="font-size: 16px; line-height: 1.6;">
          Welcome to <strong>WoodCrest Designs</strong> — where creativity meets craftsmanship.
        </p>
        <p style="font-size: 16px; line-height: 1.6;">
          Your account has been successfully created. We're thrilled to have you as part of our furniture-loving community!
        </p>
        <p style="font-size: 16px; line-height: 1.6;">
          Explore our modern designs, get inspired by architectural ideas, and make your home a masterpiece.
        </p>

        <div style="text-align: center; margin-top: 32px;">
          <a href="https://wood-crest-design.vercel.app" 
             style="background-color: #E5A000; color: white; padding: 12px 24px; border-radius: 8px; text-decoration: none; font-weight: bold;">
            Explore WoodCrest
          </a>
        </div>
      </div>

      <div style="background-color: #f0f0f0; text-align: center; padding: 16px; font-size: 14px; color: #777;">
        <p style="margin: 0;">© ${new Date().getFullYear()} WoodCrest Designs. All rights reserved.</p>
      </div>
    </div>
  </div>
  `;

  try {
    const {data, error} = await resend.emails.send({
      from: "WoodCrest Designs <isy@woodcrestdesigns.com>",
      to,
      subject,
      html: htmlContent,
    });

     await AddContacts({email: to, name: name});

     if (error) {
      console.error('Resend error:', error);
      return { success: false, error };
    }

    console.log('Email sent:', data);
    return { success: true, data };
    
  } catch (error) {
    console.error("Error sending email:", error);
    return { success: false, error };
  }


  
};
