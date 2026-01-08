// supabase.js
// ارتباط با Supabase

const SUPABASE_URL = 'https://bnjwmytwuegchetspcrw.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJuandteXR3dWVnY2hldHNwY3J3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njc4ODE2ODUsImV4cCI6MjA4MzQ1NzY4NX0.j6QToxnBTNKkSeT7NnISbJ4KZvcYrUCnhkBetfIObfY';

// ایجاد کلاینت Supabase
const supabaseClient = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

class SupabaseManager {
    constructor() {
        this.client = supabaseClient;
    }

    // ==================== کاربران ====================
    async getUsers() {
        try {
            const { data, error } = await this.client
                .from('users')
                .select('*')
                .order('created_at', { ascending: false });
            
            if (error) throw error;
            return data || [];
        } catch (error) {
            console.error('خطا در دریافت کاربران:', error);
            return [];
        }
    }

    async getUserById(userId) {
        try {
            const { data, error } = await this.client
                .from('users')
                .select('*')
                .eq('id', userId)
                .single();
            
            if (error) throw error;
            return data;
        } catch (error) {
            console.error('خطا در دریافت کاربر:', error);
            return null;
        }
    }

    async getUserByPhone(phone) {
        try {
            const { data, error } = await this.client
                .from('users')
                .select('*')
                .eq('phone', phone)
                .single();
            
            if (error) {
                if (error.code === 'PGRST116') return null; // رکورد پیدا نشد
                throw error;
            }
            return data;
        } catch (error) {
            console.error('خطا در جستجوی کاربر:', error);
            return null;
        }
    }

    async createUser(userData) {
        try {
            const { data, error } = await this.client
                .from('users')
                .insert([{
                    name: userData.name,
                    phone: userData.phone,
                    password: userData.password,
                    avatar: userData.avatar,
                    level: userData.level,
                    total_earned: userData.totalEarned,
                    referral_count: userData.referralCount,
                    referral_earnings: userData.referralEarnings,
                    join_date: userData.joinDate,
                    last_login: userData.lastLogin,
                    sod_balance: userData.sodBalance,
                    toman_balance: userData.tomanBalance,
                    mining_power: userData.miningPower,
                    mining_multiplier: userData.miningMultiplier,
                    auto_mining: userData.autoMining,
                    today_earned: userData.todayEarned,
                    total_mined: userData.totalMined,
                    completed_missions: userData.completedMissions,
                    referral_code: userData.referralCode,
                    referral_link: userData.referralLink
                }])
                .select()
                .single();
            
            if (error) throw error;
            return { success: true, data };
        } catch (error) {
            console.error('خطا در ایجاد کاربر:', error);
            return { success: false, error: error.message };
        }
    }

    async updateUser(userId, updates) {
        try {
            const { data, error } = await this.client
                .from('users')
                .update({
                    name: updates.name,
                    avatar: updates.avatar,
                    level: updates.level,
                    total_earned: updates.totalEarned,
                    referral_count: updates.referralCount,
                    referral_earnings: updates.referralEarnings,
                    last_login: updates.lastLogin,
                    sod_balance: updates.sodBalance,
                    toman_balance: updates.tomanBalance,
                    mining_power: updates.miningPower,
                    mining_multiplier: updates.miningMultiplier,
                    auto_mining: updates.autoMining,
                    today_earned: updates.todayEarned,
                    total_mined: updates.totalMined,
                    completed_missions: updates.completedMissions,
                    referral_code: updates.referralCode,
                    referral_link: updates.referralLink,
                    updated_at: new Date().toISOString()
                })
                .eq('id', userId)
                .select()
                .single();
            
            if (error) throw error;
            return { success: true, data };
        } catch (error) {
            console.error('خطا در به‌روزرسانی کاربر:', error);
            return { success: false, error: error.message };
        }
    }

    // ==================== تراکنش‌ها ====================
    async getTransactions(userId) {
        try {
            const { data, error } = await this.client
                .from('transactions')
                .select('*')
                .eq('user_id', userId)
                .order('created_at', { ascending: false });
            
            if (error) throw error;
            return data || [];
        } catch (error) {
            console.error('خطا در دریافت تراکنش‌ها:', error);
            return [];
        }
    }

    async createTransaction(transactionData) {
        try {
            const { data, error } = await this.client
                .from('transactions')
                .insert([{
                    user_id: transactionData.userId,
                    type: transactionData.type,
                    amount: transactionData.amount,
                    currency: transactionData.currency,
                    status: transactionData.status,
                    date: transactionData.date,
                    icon: transactionData.icon,
                    color: transactionData.color
                }])
                .select()
                .single();
            
            if (error) throw error;
            return { success: true, data };
        } catch (error) {
            console.error('خطا در ایجاد تراکنش:', error);
            return { success: false, error: error.message };
        }
    }

    // ==================== نوتیفیکیشن‌ها ====================
    async getNotifications(userId) {
        try {
            const { data, error } = await this.client
                .from('notifications')
                .select('*')
                .eq('user_id', userId)
                .order('created_at', { ascending: false });
            
            if (error) throw error;
            return data || [];
        } catch (error) {
            console.error('خطا در دریافت نوتیفیکیشن‌ها:', error);
            return [];
        }
    }

    async createNotification(notificationData) {
        try {
            const { data, error } = await this.client
                .from('notifications')
                .insert([{
                    user_id: notificationData.userId,
                    title: notificationData.title,
                    message: notificationData.message,
                    time: notificationData.time,
                    read: notificationData.read
                }])
                .select()
                .single();
            
            if (error) throw error;
            return { success: true, data };
        } catch (error) {
            console.error('خطا در ایجاد نوتیفیکیشن:', error);
            return { success: false, error: error.message };
        }
    }

    async markNotificationAsRead(notificationId) {
        try {
            const { data, error } = await this.client
                .from('notifications')
                .update({ read: true })
                .eq('id', notificationId)
                .select()
                .single();
            
            if (error) throw error;
            return { success: true, data };
        } catch (error) {
            console.error('خطا در بروزرسانی نوتیفیکیشن:', error);
            return { success: false, error: error.message };
        }
    }

    // ==================== دعوت‌ها ====================
    async getReferrals(userId) {
        try {
            const { data, error } = await this.client
                .from('referrals')
                .select('*')
                .eq('user_id', userId)
                .single();
            
            if (error) {
                if (error.code === 'PGRST116') return null;
                throw error;
            }
            return data;
        } catch (error) {
            console.error('خطا در دریافت دعوت‌ها:', error);
            return null;
        }
    }

    async createReferrals(referralsData) {
        try {
            const { data, error } = await this.client
                .from('referrals')
                .insert([{
                    user_id: referralsData.userId,
                    total_invites: referralsData.totalInvites,
                    active_invites: referralsData.activeInvites,
                    pending_invites: referralsData.pendingInvites,
                    total_earned: referralsData.totalEarned,
                    referral_code: referralsData.referralCode,
                    referral_link: referralsData.referralLink
                }])
                .select()
                .single();
            
            if (error) throw error;
            return { success: true, data };
        } catch (error) {
            console.error('خطا در ایجاد دعوت‌ها:', error);
            return { success: false, error: error.message };
        }
    }

    async updateReferrals(referralsId, updates) {
        try {
            const { data, error } = await this.client
                .from('referrals')
                .update({
                    total_invites: updates.totalInvites,
                    active_invites: updates.activeInvites,
                    pending_invites: updates.pendingInvites,
                    total_earned: updates.totalEarned,
                    updated_at: new Date().toISOString()
                })
                .eq('id', referralsId)
                .select()
                .single();
            
            if (error) throw error;
            return { success: true, data };
        } catch (error) {
            console.error('خطا در به‌روزرسانی دعوت‌ها:', error);
            return { success: false, error: error.message };
        }
    }

    // ==================== مأموریت‌ها ====================
    async getUserMissions(userId) {
        try {
            const { data, error } = await this.client
                .from('missions')
                .select('*')
                .eq('user_id', userId)
                .order('created_at', { ascending: false });
            
            if (error) throw error;
            return data || [];
        } catch (error) {
            console.error('خطا در دریافت مأموریت‌ها:', error);
            return [];
        }
    }

    async createMission(missionData) {
        try {
            const { data, error } = await this.client
                .from('missions')
                .insert([{
                    user_id: missionData.userId,
                    name: missionData.name,
                    reward: missionData.reward,
                    progress: missionData.progress,
                    max: missionData.max,
                    completed: missionData.completed
                }])
                .select()
                .single();
            
            if (error) throw error;
            return { success: true, data };
        } catch (error) {
            console.error('خطا در ایجاد مأموریت:', error);
            return { success: false, error: error.message };
        }
    }

    async updateMission(missionId, updates) {
        try {
            const { data, error } = await this.client
                .from('missions')
                .update({
                    progress: updates.progress,
                    completed: updates.completed,
                    completed_at: updates.completed ? new Date().toISOString() : null,
                    updated_at: new Date().toISOString()
                })
                .eq('id', missionId)
                .select()
                .single();
            
            if (error) throw error;
            return { success: true, data };
        } catch (error) {
            console.error('خطا در به‌روزرسانی مأموریت:', error);
            return { success: false, error: error.message };
        }
    }

    // ==================== پاداش‌ها ====================
    async getUserRewards(userId) {
        try {
            const { data, error } = await this.client
                .from('rewards')
                .select('*')
                .eq('user_id', userId)
                .order('created_at', { ascending: false });
            
            if (error) throw error;
            return data || [];
        } catch (error) {
            console.error('خطا در دریافت پاداش‌ها:', error);
            return [];
        }
    }

    async createReward(rewardData) {
        try {
            const { data, error } = await this.client
                .from('rewards')
                .insert([{
                    user_id: rewardData.userId,
                    type: rewardData.type,
                    amount: rewardData.amount,
                    claimed: rewardData.claimed,
                    claim_date: rewardData.claimed ? new Date().toISOString() : null
                }])
                .select()
                .single();
            
            if (error) throw error;
            return { success: true, data };
        } catch (error) {
            console.error('خطا در ایجاد پاداش:', error);
            return { success: false, error: error.message };
        }
    }

    async claimReward(rewardId) {
        try {
            const { data, error } = await this.client
                .from('rewards')
                .update({ 
                    claimed: true,
                    claim_date: new Date().toISOString(),
                    updated_at: new Date().toISOString()
                })
                .eq('id', rewardId)
                .select()
                .single();
            
            if (error) throw error;
            return { success: true, data };
        } catch (error) {
            console.error('خطا در بروزرسانی پاداش:', error);
            return { success: false, error: error.message };
        }
    }

    // ==================== تنظیمات ====================
    async getUserSettings(userId) {
        try {
            const { data, error } = await this.client
                .from('user_settings')
                .select('*')
                .eq('user_id', userId)
                .single();
            
            if (error) {
                if (error.code === 'PGRST116') {
                    // ایجاد تنظیمات پیش‌فرض
                    return await this.createDefaultSettings(userId);
                }
                throw error;
            }
            return { success: true, data };
        } catch (error) {
            console.error('خطا در دریافت تنظیمات:', error);
            return { success: false, error: error.message };
        }
    }

    async createDefaultSettings(userId) {
        try {
            const { data, error } = await this.client
                .from('user_settings')
                .insert([{
                    user_id: userId,
                    dark_mode: true,
                    notifications: true,
                    sound: true,
                    vibration: true,
                    language: 'fa'
                }])
                .select()
                .single();
            
            if (error) throw error;
            return { success: true, data };
        } catch (error) {
            console.error('خطا در ایجاد تنظیمات پیش‌فرض:', error);
            return { success: false, error: error.message };
        }
    }

    async updateSettings(settingsId, updates) {
        try {
            const { data, error } = await this.client
                .from('user_settings')
                .update({
                    dark_mode: updates.darkMode,
                    notifications: updates.notifications,
                    sound: updates.sound,
                    vibration: updates.vibration,
                    language: updates.language,
                    updated_at: new Date().toISOString()
                })
                .eq('id', settingsId)
                .select()
                .single();
            
            if (error) throw error;
            return { success: true, data };
        } catch (error) {
            console.error('خطا در به‌روزرسانی تنظیمات:', error);
            return { success: false, error: error.message };
        }
    }
}

// ایجاد نمونه از کلاس
const supabaseManager = new SupabaseManager();
