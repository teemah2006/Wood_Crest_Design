import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export const AddContacts = async ({ email, name }: { email: string, name?: string }) => {
    try {
        const { data, error } = await resend.contacts.create({
            email: email,
            firstName: name ? name : "",
            unsubscribed: false,
            audienceId: 'd929dab9-ccb4-469c-90ab-239d50e5db85',
        });

        if (error) {
            console.error('Resend error:', error);
            return { success: false, error };
        }

        console.log('Email sent:', data);
        return { success: true, data };
    } catch (error) {
        console.error('error adding contact', error);
        return { success: false, error };
    }
}

