import { View, Text, TextInput, TouchableOpacity, Image } from 'react-native'
import React, { useState } from 'react'
import { images } from '@/constants/images';
import { icons } from '@/constants/icons';
import { useRouter } from 'expo-router';
import { signInWithEmailAndPassword, sendPasswordResetEmail } from 'firebase/auth';
import { auth } from '@/FirebaseConfig';

const login = () => {
    const router = useRouter();
    const [email, setemail] = useState("")
    const [password, setPassword] = useState("")

    const handleSingin = async () => {
        try {
            const user = await signInWithEmailAndPassword(auth, email, password);
            const userdet = user.user;
            console.log(userdet);    
            if (user) router.replace('/(tabs)');
        } 
        catch (err: any) {
            console.log(err);
            alert("We're having some issues, Please try later.");
        }
    };
    
    const handleResetPassword = async () => {
        try {
            await sendPasswordResetEmail(auth, email);
            alert("Password reset email sent!");
        } catch (error) {
            console.error(error);
            alert("Error sending password reset email.");
        }
    };
    return (
        <View className="flex-1 justify-center items-center bg-white mb-10">
            <View className="w-[80%]">
                <View className="items-center">
                    <Text className="text-3xl font-bold mb-8 text-center text-gray-800">Login</Text>
                    <Image 
                        source={images.login}
                        className="w-58 h-48 self-center mb-8"
                        resizeMode="contain"
                    />
                    
                    <TextInput
                        className="w-full h-12 px-4 mb-4 border border-gray-300 rounded-lg"
                        placeholder="Email"
                        keyboardType="email-address"
                        value={email}
                        onChangeText={text => setemail(text)}
                        autoCapitalize="none"
                    />
                    
                    <TextInput
                        className="w-full h-12 px-4 mb-2 border border-gray-300 rounded-lg"
                        placeholder="Password"
                        value={password}
                        onChangeText={text => setPassword(text)}
                        secureTextEntry
                    />
                    
                    <TouchableOpacity>
                        <Text className="text-right text-blue-500 mb-6" onPress={handleResetPassword}>Forgot Password?</Text>
                    </TouchableOpacity>
                    
                    <TouchableOpacity className="w-[80%] bg-blue-500 py-3 rounded-lg mb-4" onPress={handleSingin}>
                        <Text className="text-white text-center font-semibold">Login</Text>
                    </TouchableOpacity>
                    
                    <View className="flex-row items-center mb-4 w-full">
                        <View className="flex-1 border-t border-gray-300"></View>
                        <Text className="mx-2 text-gray-500">OR</Text>
                        <View className="flex-1 border-t border-gray-300"></View>
                    </View>
                    <TouchableOpacity className="w-[80%] bg-gray-200 py-3 rounded-lg mb-4 flex-row items-center justify-center">
                        <Image 
                            source={icons.google}
                            className="w-6 h-6 mr-2"
                        />
                        <Text className="text-gray-800 font-semibold">Login with Google</Text>
                    </TouchableOpacity>
                    <TouchableOpacity className="w-[80%] bg-gray-200 py-3 rounded-lg mb-4 flex-row items-center justify-center">
                        <Image
                            source={icons.github}
                            className="w-6 h-6 mr-2"
                        />
                        <Text className="text-gray-800 font-semibold">Login with Github</Text>
                    </TouchableOpacity>
                    
                    <View className="flex-row">
                        <Text className="text-gray-600">Don't have an account? </Text>
                        <TouchableOpacity onPress={() => router.push("../screens/register")}>
                            <Text className="text-blue-500 font-semibold">Sign Up</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
            </View>
    )
}

export default login