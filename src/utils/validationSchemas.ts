import * as Yup from "yup";

export const RegistrationValidationSchema = Yup.object().shape({
	username: Yup.string().min(6, "username is too short").required("required"),
	email: Yup.string().email("invalid email").required("required"),
	password: Yup.string().min(6, "password is too short").required("required"),
});

export const LoginValidationSchema = Yup.object().shape({
	usernameOrEmail: Yup.string()
		.min(6, "invalid username or email")
		.required("required"),
	password: Yup.string().min(6, "invalid password").required("required"),
});

export const ForgetPasswordValidationSchema = Yup.object().shape({
	email: Yup.string().email("invalid email").required("required"),
});

export const QuickSubmissionValidationSchema = Yup.object().shape({
	title: Yup.string().min(10, "title is too short").required(),
	category: Yup.string().required(),
	description: Yup.string(),
	body: Yup.string(),
	documentFiles: Yup.array(),
	coverImage: Yup.array(),
});
