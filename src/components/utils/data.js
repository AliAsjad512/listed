
import supabase from "./supabase";
import bcrypt from "bcryptjs";

const registerUser = async (email, password, username) => {
  const { data, error } = await supabase
    .from("users")
    .select("*")
    .eq("email", email);

  if (error) {
    return {
      success: false,
      message: error.message,
    };
  }

  if (data.length > 0) {
    return {
      success: false,
      message: "User email already exists",
    };
  }

  const usernameData = await supabase
    .from("users")
    .select("*")
    .eq("username", username);

  if (usernameData.error != null) {
    return {
      success: false,
      message: errorUsername.message,
    };
  }

  if (usernameData.data.length > 0) {
    return {
      success: false,
      message: "Username already exists",
    };
  }

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  const authResponse = await supabase.auth.signUp({
    email,
    password: hashedPassword,
    username,
  });

  if (authResponse.error != null) {
    return {
      success: false,
      message: authResponse.error.message,
    };
  }

  if (authResponse.data.user.email !== null) {
    const addMetaResponse = await supabase.from("users").insert([
      {
        id: authResponse.data.user.id, // Use 'id' instead of 'userId'
        username,
        email,
        password: hashedPassword,
      },
    ]);

    if (addMetaResponse.error) {
      return {
        success: false,
        message: addMetaResponse.error.message,
      };
    }

    return {
      success: true,
      ...addMetaResponse.data,
    };
  }
};

const loginUser = async (username, email, password) => {
  const getUserByUsername = await supabase
    .from("users")
    .select()
    .eq("username", username);
  if (getUserByUsername.error) {
    return {
      success: false,
      error: getUserByUsername.error,
    };
  }
  if (getUserByUsername.data.length === 0) {
    return {
      success: false,
      error: "Invalid username",
    };
  }

  const getUserByEmail = await supabase
    .from("users")
    .select()
    .eq("email", email);
  if (getUserByEmail.error) {
    return {
      success: false,
      error: getUserByEmail.error,
    };
  }
  if (getUserByEmail.data.length === 0) {
    return {
      success: false,
      error: "Invalid email",
    };
  }

  const getUserEncryptedPassword = await supabase
    .from("users")
    .select()
    .eq("username", username)
    .eq("email", email);
  if (getUserEncryptedPassword.error) {
    return {
      success: false,
      error: getUserEncryptedPassword.error,
    };
  }

  const passwordMatch = await bcrypt.compare(
    password,
    getUserEncryptedPassword.data[0].password
  );
  if (!passwordMatch) {
    return {
      success: false,
      error: "Invalid password",
    };
  }

  const authResponse = await supabase.auth.signInWithPassword({
    username,
    email,
    password: getUserEncryptedPassword.data[0].password,
  });
  if (authResponse.error) {
    return {
      success: false,
      error: authResponse.error.message,
    };
  }

  if (authResponse.data.user !== null) {
    return {
      ...authResponse,
      success: true,
    };
  }
  return {
    success: false,
    message: "An unknown error has occurred",
  };
};



export { registerUser, loginUser };
