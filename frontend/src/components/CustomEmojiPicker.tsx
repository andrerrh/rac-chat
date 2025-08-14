import {
  EmojiPicker,
  EmojiPickerSearch,
  EmojiPickerContent,
  EmojiPickerFooter,
} from "@/components/ui/emoji-picker";

interface CustomEmojiPickerProps {
  setMessage: React.Dispatch<React.SetStateAction<string>>;
}

export function CustomEmojiPicker({ setMessage }: CustomEmojiPickerProps) {
  return (
    <EmojiPicker
      className="h-[326px]"
      onEmojiSelect={(({ emoji }) => setMessage(prev => prev + emoji))}
    >
      <EmojiPickerSearch />
      <EmojiPickerContent />
      <EmojiPickerFooter />
    </EmojiPicker>
  )
}
